'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Check, FileText } from 'lucide-react'
import { BusinessType, DocumentType } from '@prisma/client'

interface FormData {
  // Step 1: Document type
  documentType: DocumentType | null
  
  // Step 2: Business type
  businessType: BusinessType | null
  
  // Step 3: Company info
  companyName: string
  legalForm: string
  siret: string
  address: string
  city: string
  zipCode: string
  country: string
  
  // Step 4: Contact
  phone: string
  email: string
  websiteUrl: string
  hostingProvider: string
  
  // Step 5: Business specifics (conditional)
  vatNumber: string
  sellsPhysical: boolean
  sellsDigital: boolean
  hasSubscription: boolean
}

const initialFormData: FormData = {
  documentType: null,
  businessType: null,
  companyName: '',
  legalForm: '',
  siret: '',
  address: '',
  city: '',
  zipCode: '',
  country: 'France',
  phone: '',
  email: '',
  websiteUrl: '',
  hostingProvider: '',
  vatNumber: '',
  sellsPhysical: false,
  sellsDigital: false,
  hasSubscription: false,
}

const businessTypes: { value: BusinessType; label: string; description: string }[] = [
  { value: 'FREELANCE', label: 'Freelance / Auto-entrepreneur', description: 'Consultant, développeur, designer' },
  { value: 'ECOMMERCE', label: 'E-commerce', description: 'Boutique en ligne, vente de produits' },
  { value: 'SAAS', label: 'SaaS / Logiciel', description: 'Application web, logiciel en ligne' },
  { value: 'BLOG', label: 'Blog / Contenu', description: 'Blog, média, site de contenu' },
  { value: 'CONSULTING', label: 'Cabinet de conseil', description: 'Agence, conseil, services B2B' },
  { value: 'OTHER', label: 'Autre', description: 'Autre type d\'activité' },
]

const documentTypes: { value: DocumentType; label: string; description: string; free: boolean }[] = [
  { value: 'LEGAL_NOTICE', label: 'Mentions Légales', description: 'Obligatoire pour tous les sites', free: true },
  { value: 'PRIVACY_POLICY', label: 'Politique de Confidentialité', description: 'Conforme RGPD', free: false },
  { value: 'TERMS_OF_SERVICE', label: 'CGV / CGU', description: 'Pour ventes et services', free: false },
]

export default function DocumentForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const totalSteps = 5

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.documentType !== null
      case 2:
        return formData.businessType !== null
      case 3:
        return !!(formData.companyName && formData.address && formData.city && formData.zipCode)
      case 4:
        return !!(formData.email && formData.websiteUrl)
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8">
        <div className="flex justify-between mb-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex-1 h-2 mx-1 rounded-full transition-all relative overflow-hidden ${
                i + 1 <= currentStep
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              {i + 1 <= currentStep && (
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-gray-400 text-center font-medium">
          Étape {currentStep} sur {totalSteps}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-dark border-white/10 shadow-glass">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {currentStep === 1 && 'Quel document souhaitez-vous générer ?'}
                  {currentStep === 2 && 'Quel est votre type d\'activité ?'}
                  {currentStep === 3 && 'Informations de votre entreprise'}
                  {currentStep === 4 && 'Coordonnées de contact'}
                  {currentStep === 5 && 'Détails de votre activité'}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  {currentStep === 1 && 'Sélectionnez le type de document à créer'}
                  {currentStep === 2 && 'Cela nous aide à personnaliser votre document'}
                  {currentStep === 3 && 'Informations légales obligatoires'}
                  {currentStep === 4 && 'Comment vous contacter'}
                  {currentStep === 5 && 'Informations spécifiques à votre activité'}
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Document Type */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {documentTypes.map((doc, index) => (
                    <motion.div
                      key={doc.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl cursor-pointer transition-all relative overflow-hidden group ${
                        formData.documentType === doc.value
                          ? 'glass border-primary-500 shadow-neon'
                          : 'glass-dark border-white/20 hover:border-primary-500/50'
                      }`}
                      onClick={() => updateFormData({ documentType: doc.value })}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          {doc.free && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold border border-green-500/30">
                              GRATUIT
                            </span>
                          )}
                          {!doc.free && (
                            <span className="text-xs bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full font-semibold border border-accent-500/30">
                              PREMIUM
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white mb-1 text-lg">{doc.label}</h3>
                        <p className="text-sm text-gray-400">{doc.description}</p>
                        {formData.documentType === doc.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-4 flex items-center text-primary-400"
                          >
                            <Check className="h-5 w-5" />
                            <span className="ml-2 text-sm font-semibold">Sélectionné</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Step 2: Business Type */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessTypes.map((business, index) => (
                    <motion.div
                      key={business.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-xl cursor-pointer transition-all relative overflow-hidden group ${
                        formData.businessType === business.value
                          ? 'glass border-accent-500 shadow-neon-accent'
                          : 'glass-dark border-white/20 hover:border-accent-500/50'
                      }`}
                      onClick={() => updateFormData({ businessType: business.value })}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-primary-500/0 group-hover:from-accent-500/10 group-hover:to-primary-500/10 transition-all"></div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-white mb-1 text-lg">{business.label}</h3>
                        <p className="text-sm text-gray-400">{business.description}</p>
                        {formData.businessType === business.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-3 flex items-center text-accent-400"
                          >
                            <Check className="h-5 w-5" />
                            <span className="ml-2 text-sm font-semibold">Sélectionné</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Step 3: Company Info */}
              {currentStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-gray-300 font-medium">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateFormData({ companyName: e.target.value })}
                      placeholder="Ex: Ma Super Entreprise SARL"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="legalForm" className="text-gray-300 font-medium">Forme juridique</Label>
                      <Input
                        id="legalForm"
                        value={formData.legalForm}
                        onChange={(e) => updateFormData({ legalForm: e.target.value })}
                        placeholder="Ex: SARL, SAS, EURL, Auto-entrepreneur"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siret" className="text-gray-300 font-medium">SIRET</Label>
                      <Input
                        id="siret"
                        value={formData.siret}
                        onChange={(e) => updateFormData({ siret: e.target.value })}
                        placeholder="14 chiffres"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-300 font-medium">Adresse *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData({ address: e.target.value })}
                      placeholder="Numéro et nom de rue"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="zipCode" className="text-gray-300 font-medium">Code postal *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData({ zipCode: e.target.value })}
                        placeholder="75001"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-gray-300 font-medium">Ville *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData({ city: e.target.value })}
                        placeholder="Paris"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-gray-300 font-medium">Pays</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => updateFormData({ country: e.target.value })}
                        placeholder="France"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      placeholder="contact@monentreprise.fr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl">URL du site web *</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
                      placeholder="https://www.monentreprise.fr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hostingProvider">Hébergeur</Label>
                    <Input
                      id="hostingProvider"
                      value={formData.hostingProvider}
                      onChange={(e) => updateFormData({ hostingProvider: e.target.value })}
                      placeholder="Ex: OVH, AWS, Vercel"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Business Specifics */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {(formData.businessType === 'ECOMMERCE' || formData.businessType === 'SAAS') && (
                    <div>
                      <Label htmlFor="vatNumber">Numéro de TVA intracommunautaire</Label>
                      <Input
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={(e) => updateFormData({ vatNumber: e.target.value })}
                        placeholder="FR12345678901"
                      />
                    </div>
                  )}

                  {formData.businessType === 'ECOMMERCE' && (
                    <div className="space-y-3">
                      <p className="font-medium text-sm text-gray-700">Type de produits vendus :</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sellsPhysical"
                          checked={formData.sellsPhysical}
                          onChange={(e) => updateFormData({ sellsPhysical: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <Label htmlFor="sellsPhysical" className="font-normal">
                          Produits physiques (livraison requise)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sellsDigital"
                          checked={formData.sellsDigital}
                          onChange={(e) => updateFormData({ sellsDigital: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <Label htmlFor="sellsDigital" className="font-normal">
                          Produits numériques (téléchargement)
                        </Label>
                      </div>
                    </div>
                  )}

                  {formData.businessType === 'SAAS' && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hasSubscription"
                        checked={formData.hasSubscription}
                        onChange={(e) => updateFormData({ hasSubscription: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <Label htmlFor="hasSubscription" className="font-normal">
                        Offres par abonnement / récurrent
                      </Label>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Dernière étape !</strong> Vérifiez vos informations puis cliquez sur "Générer mon document" pour créer votre document légal personnalisé.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between pt-6 border-t border-white/10 mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 border-white/20 hover:bg-white/10 text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Précédent
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon text-white font-semibold disabled:opacity-50"
                  >
                    {currentStep === totalSteps ? (
                      <>
                        <FileText className="h-4 w-4" />
                        Générer mon document
                      </>
                    ) : (
                      <>
                        Suivant
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
