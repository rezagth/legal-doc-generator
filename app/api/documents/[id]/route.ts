import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params pour Next.js 15+
    const { id } = await params
    
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
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Récupérer le document
    const document = await prisma.document.findUnique({
      where: { id }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier que le document appartient à l'utilisateur
    if (document.userId !== user.id) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    return NextResponse.json(document)

  } catch (error) {
    console.error('Erreur lors de la récupération du document:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
