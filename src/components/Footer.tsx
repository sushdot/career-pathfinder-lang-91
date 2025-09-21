import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart 
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { name: t('footer.home'), path: '/' },
      { name: t('footer.quiz'), path: '/quiz' },
      { name: t('footer.courses'), path: '/courses' },
      { name: t('footer.colleges'), path: '/colleges' },
      { name: t('footer.scholarships'), path: '/scholarships' },
    ],
    support: [
      { name: t('footer.help'), path: '/help' },
      { name: t('footer.contact'), path: '/contact' },
      { name: t('footer.faq'), path: '/faq' },
      { name: t('footer.privacy'), path: '/privacy' },
      { name: t('footer.terms'), path: '/terms' },
    ],
    resources: [
      { name: t('footer.guides'), path: '/guides' },
      { name: t('footer.blog'), path: '/blog' },
      { name: t('footer.news'), path: '/news' },
      { name: t('footer.events'), path: '/events' },
      { name: t('footer.downloads'), path: '/downloads' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">
                Career Guide J&K
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@careerguide-jk.gov.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91-194-2123456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Srinagar, Jammu & Kashmir, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-white smooth-transition hover-scale"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary smooth-transition"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('footer.support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary smooth-transition"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary smooth-transition"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>© 2024 Career Guide J&K. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for students of Jammu & Kashmir</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-primary smooth-transition">
                {t('footer.privacy')}
              </button>
              <button className="hover:text-primary smooth-transition">
                {t('footer.terms')}
              </button>
              <button className="hover:text-primary smooth-transition">
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;