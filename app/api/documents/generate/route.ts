import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateDocument } from '@/lib/templates/legal-templates'
import { DocumentType, BusinessType } from '@prisma/client'
import { marked } from 'marked'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    const {
      documentType,
      businessType,
      companyName,
      legalForm,
      siret,
      address,
      city,
      zipCode,
      country,
      phone,
      email,
      websiteUrl,
      hostingProvider,
      vatNumber,
      sellsPhysical,
      sellsDigital,
      hasSubscription
    } = body

    // Validate required fields
    if (!documentType || !businessType || !companyName || !address || !city || !zipCode || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate markdown content
    const markdownContent = generateDocument(documentType as DocumentType, {
      companyName,
      legalForm,
      siret,
      address,
      city,
      zipCode,
      country,
      phone,
      email,
      websiteUrl,
      hostingProvider,
      vatNumber,
      sellsPhysical: sellsPhysical || false,
      sellsDigital: sellsDigital || false,
      hasSubscription: hasSubscription || false,
      businessType: businessType as BusinessType
    })

    // Convert markdown to HTML
    const htmlContent = await marked(markdownContent)

    // Vérifier les droits selon l'abonnement
    const docType = documentType as DocumentType
    const isPremiumDoc = docType === 'PRIVACY_POLICY' || docType === 'TERMS_OF_SERVICE'
    
    if (isPremiumDoc && user.subscription?.tier === 'FREE') {
      return NextResponse.json(
        { error: 'Document premium. Passez à Premium pour y accéder.' },
        { status: 403 }
      )
    }

    // Save to database
    const document = await prisma.document.create({
      data: {
        type: docType,
        businessType: businessType as BusinessType,
        companyName,
        legalForm,
        siret,
        address,
        city,
        zipCode,
        country,
        phone,
        email,
        websiteUrl,
        hostingProvider,
        vatNumber,
        sellsPhysical: sellsPhysical || false,
        sellsDigital: sellsDigital || false,
        hasSubscription: hasSubscription || false,
        htmlContent,
        markdownContent,
        userId: user.id,
        language: 'fr'
      }
    })

    return NextResponse.json({
      success: true,
      documentId: document.id,
      htmlContent,
      markdownContent
    })

  } catch (error) {
    console.error('Error generating document:', error)
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    )
  }
}
