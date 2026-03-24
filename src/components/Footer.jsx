import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../img/logo.jpg';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img src={logo} alt="Eat Clean Logo" className="h-[60px] w-auto rounded-full object-contain mb-4" />
            <p className="text-gray-400">
              {t('storyText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('aboutUs')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">{t('home')}</Link></li>
              <li><Link to="/menu" className="hover:text-white transition">{t('menu')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition">{t('about')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contactUs')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:0888090839" className="flex items-center gap-2 hover:text-white transition">
                  <FaPhone /> 0888090839
                </a>
              </li>
              <li>
                <a href="mailto:eatclean.cskh@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                  <FaEnvelope /> eatclean.cskh@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1CYbxZAA1w/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/eatclean2610?igsh=MWFlNWtydWx6Y3hzeA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@eatclean_201?_r=1&_t=ZS-94wAqLKWeWL" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-400">
          <p>&copy; 2026 EAT CLEAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
