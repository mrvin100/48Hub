import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Zap, Users, Target, Award, Shield } from "lucide-react"

export const metadata = {
  title: "Accueil - Plateforme Alumni KFOKAM48",
  description: "Plateforme officielle des diplômés de KFOKAM48, première école de développement informatique gratuite au Cameroun. Vérifiez l'authenticité des formations, découvrez les projets des alumni et consultez leur parcours professionnel.",
}

export default function Home() {
  const t = useTranslations('HomePage');
  
  return (
    <main className="pt-32 sm:pt-40">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
                <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Plateforme Officielle
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                {t('title')}
              </h1>

              <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed text-balance">
                {t('subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  {t('cta1')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#about">
                <Button size="lg" variant="outline">
                  {t('cta2')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{t('stat1')}</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Formation Gratuite</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{t('stat2')}</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Campus Ouvert</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{t('stat3')}</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Mois de Formation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 py-20 sm:py-32 border-t border-border/50">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-16">
            {/* Section Header */}
            <div className="text-center space-y-4 animate-fade-in-up">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Features</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                {t('featuresTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('featuresSubtitle')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Shield, titleKey: 'feature1Title', descKey: 'feature1Desc' },
                { icon: Users, titleKey: 'feature2Title', descKey: 'feature2Desc' },
                { icon: BookOpen, titleKey: 'feature3Title', descKey: 'feature3Desc' },
                { icon: Target, titleKey: 'feature4Title', descKey: 'feature4Desc' },
                { icon: Award, titleKey: 'feature5Title', descKey: 'feature5Desc' },
                { icon: Zap, titleKey: 'feature6Title', descKey: 'feature6Desc' },
              ].map((feature) => (
                <div
                  key={feature.titleKey}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{t(feature.titleKey as any)}</h3>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey as any)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 sm:px-6 py-20 sm:py-32 border-t border-border/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">À Propos</p>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {t('aboutTitle')}
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{t('aboutP1')}</p>
                <p>{t('aboutP2')}</p>
                <p>{t('aboutP3')}</p>
                <p className="text-foreground font-medium">{t('about48hub')}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Commencer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="https://kfokam48.org" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    {t('aboutLink')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative flex items-center justify-center">
              <div className="relative flex h-64 w-64 sm:h-80 sm:w-80 items-center justify-center rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
                <span className="font-mono text-8xl sm:text-9xl font-bold text-primary/80">K48</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
