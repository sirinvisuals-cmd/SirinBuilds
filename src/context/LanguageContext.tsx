import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
  region?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr', region: 'Global' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', region: 'Europe / Americas' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', region: 'Europe' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', region: 'Europe' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', region: 'Middle East' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr', region: 'South Asia' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', dir: 'ltr', region: 'India' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', region: 'South Asia' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr', region: 'Americas / Europe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', region: 'Eurasia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr', region: 'East Asia' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', dir: 'ltr', region: 'East Asia' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', dir: 'ltr', region: 'East Asia' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr', region: 'Europe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr', region: 'Europe' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', region: 'Eurasia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr', region: 'East Asia' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', region: 'Southeast Asia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr', region: 'Southeast Asia' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', region: 'Southeast Asia' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr', region: 'Southeast Asia' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr', region: 'Europe' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr', region: 'Europe' },
  { code: 'tl', name: 'Filipino / Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', dir: 'ltr', region: 'Southeast Asia' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl', region: 'Middle East' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr', region: 'Europe' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl', region: 'Middle East' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', dir: 'ltr', region: 'Europe' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr', region: 'Europe' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr', region: 'Europe' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr', region: 'Europe' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr', region: 'Europe' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr', region: 'Europe' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', dir: 'ltr', region: 'Europe' },
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    ar: 'الرئيسية',
    bn: 'হোম',
    ta: 'முகப்பு',
    te: 'హోమ్',
    mr: 'मुख्यपृष्ठ',
    gu: 'હોમ',
    kn: 'ಮುಖಪುಟ',
    ml: 'ഹോം',
    pt: 'Início',
    ru: 'Главная',
    ja: 'ホーム',
    'zh-CN': '首页',
  },
  'nav.services': {
    en: 'Services',
    hi: 'सेवाएं',
    es: 'Servicios',
    fr: 'Services',
    de: 'Dienstleistungen',
    ar: 'الخدمات',
    bn: 'সেবা',
    ta: 'சேவைகள்',
    te: 'సేవలు',
    mr: 'सेवा',
    gu: 'સેવાઓ',
    kn: 'ಸೇವೆಗಳು',
    ml: 'സേവനങ്ങൾ',
    pt: 'Serviços',
    ru: 'Услуги',
    ja: 'サービス',
    'zh-CN': '服务项目',
  },
  'nav.whyUs': {
    en: 'Why Us',
    hi: 'हम क्यों',
    es: 'Por Qué Nosotros',
    fr: 'Pourquoi Nous',
    de: 'Warum Wir',
    ar: 'لماذا نحن',
    bn: 'কেন আমরা',
    ta: 'ஏன் நாங்கள்',
    te: 'మమ్మల్ని ఎందుకు',
    mr: 'आम्हीच का',
    gu: 'અમે શા માટે',
    kn: 'ನಾವು ಏಕೆ',
    ml: 'എന്തുകൊണ്ട് ഞങ്ങൾ',
    pt: 'Por Que Nós',
    ru: 'Почему мы',
    ja: '選ばれる理由',
    'zh-CN': '为什么选择我们',
  },
  'nav.pricing': {
    en: 'Pricing',
    hi: 'मूल्य निर्धारण',
    es: 'Precios',
    fr: 'Tarifs',
    de: 'Preise',
    ar: 'الأسعار',
    bn: 'মূল্যতালিকা',
    ta: 'விலை',
    te: 'ధరలు',
    mr: 'किंमत',
    gu: 'કિંમતો',
    kn: 'ಬೆಲೆಗಳು',
    ml: 'വിലവിവരം',
    pt: 'Preços',
    ru: 'Тарифы',
    ja: '料金プラン',
    'zh-CN': '价格方案',
  },
  'nav.portfolio': {
    en: 'Portfolio',
    hi: 'पोर्टफोलियो',
    es: 'Portafolio',
    fr: 'Portfolio',
    de: 'Portfolio',
    ar: 'أعمالنا',
    bn: 'পোর্টফোলিও',
    ta: 'போர்ட்ஃபோலியோ',
    te: 'పోర్ట్‌ఫోలియో',
    mr: 'पोर्टफोलिओ',
    gu: 'પોર્ટફોલિયો',
    kn: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
    ml: 'പോർട്ട്ഫോളിയോ',
    pt: 'Portfólio',
    ru: 'Портфолио',
    ja: '制作実績',
    'zh-CN': '作品案例',
  },
  'nav.process': {
    en: 'Process',
    hi: 'प्रक्रिया',
    es: 'Proceso',
    fr: 'Processus',
    de: 'Ablauf',
    ar: 'خطوات العمل',
    bn: 'প্রক্রিয়া',
    ta: 'செயல்முறை',
    te: 'ప్రక్రియ',
    mr: 'प्रक्रिया',
    gu: 'પ્રક્રિયા',
    kn: 'ಪ್ರಕ್ರಿಯೆ',
    ml: 'പ്രക്രിയ',
    pt: 'Processo',
    ru: 'Процесс',
    ja: '制作の流れ',
    'zh-CN': '工作流程',
  },
  'nav.about': {
    en: 'About',
    hi: 'हमारे बारे में',
    es: 'Nosotros',
    fr: 'À propos',
    de: 'Über uns',
    ar: 'من نحن',
    bn: 'আমাদের সম্পর্কে',
    ta: 'எங்களை பற்றி',
    te: 'మా గురించి',
    mr: 'आमच्याबद्दल',
    gu: 'અમારા વિશે',
    kn: 'ನಮ್ಮ ಬಗ್ಗೆ',
    ml: 'ഞങ്ങളെക്കുറിച്ച്',
    pt: 'Sobre',
    ru: 'О нас',
    ja: '会社概要',
    'zh-CN': '关于我们',
  },
  'nav.contact': {
    en: 'Contact',
    hi: 'संपर्क करें',
    es: 'Contacto',
    fr: 'Contact',
    de: 'Kontakt',
    ar: 'اتصل بنا',
    bn: 'যোগাযোগ',
    ta: 'தொடர்புக்கு',
    te: 'సంప్రదించండి',
    mr: 'संपर्क',
    gu: 'સંપર્ક',
    kn: 'ಸಂಪರ್ಕಿಸಿ',
    ml: 'ബന്ധപ്പെടുക',
    pt: 'Contato',
    ru: 'Контакты',
    ja: 'お問い合わせ',
    'zh-CN': '联系我们',
  },
  'btn.getStarted': {
    en: 'Get Started',
    hi: 'शुरू करें',
    es: 'Empezar',
    fr: 'Commencer',
    de: 'Loslegen',
    ar: 'ابدأ الآن',
    bn: 'শুরু করুন',
    ta: 'தொடங்குங்கள்',
    te: 'ప్రారంభించండి',
    mr: 'सुरू करा',
    gu: 'શરૂ કરો',
    kn: 'ಪ್ರಾರಂಭಿಸಿ',
    ml: 'ആരംഭിക്കുക',
    pt: 'Começar',
    ru: 'Начать',
    ja: '今すぐ始める',
    'zh-CN': '立即开始',
  },
  'btn.viewServices': {
    en: 'View Services',
    hi: 'सेवाएं देखें',
    es: 'Ver Servicios',
    fr: 'Voir les services',
    de: 'Dienste anzeigen',
    ar: 'عرض الخدمات',
    bn: 'সেবাসমূহ দেখুন',
    ta: 'சேவைகளைப் பார்க்கவும்',
    te: 'సేవలను చూడండి',
    mr: 'सेवा पहा',
    gu: 'સેવાઓ જુઓ',
    kn: 'ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    ml: 'സേവനങ്ങൾ കാണുക',
    pt: 'Ver Serviços',
    ru: 'Смотреть услуги',
    ja: 'サービスを見る',
    'zh-CN': '查看服务',
  },
  'hero.pill': {
    en: 'Website Development • Web Hosting • Domains • Support',
    hi: 'वेबसाइट डेवलपमेंट • वेब होस्टिंग • डोमेन • सपोर्ट',
    es: 'Desarrollo Web • Alojamiento Web • Dominios • Soporte',
    fr: 'Développement Web • Hébergement Web • Domaines • Support',
    de: 'Webentwicklung • Webhosting • Domains • Support',
    ar: 'تطوير المواقع • استضافة المواقع • النطاقات • الدعم الفني',
    bn: 'ওয়েবসাইট ডেভেলপমেন্ট • ওয়েব হোস্টিং • ডোমেন • সহায়তা',
    ta: 'இணையதள உருவாக்கம் • வெப் ஹோஸ்டிங் • டொமைன்கள் • ஆதரவு',
    te: 'వెబ్‌సైట్ అభివృద్ధి • వెబ్ హోస్టింగ్ • డొమైన్‌లు • మద్దతు',
    mr: 'वेबसाईट डेव्हलपमेंट • वेब होस्टिंग • डोमेन • सपोर्ट',
    gu: 'વેબસાઇટ ડેવલપમેન્ટ • વેબ હોસ્ટિંગ • ડોમેન્સ • સપોર્ટ',
    kn: 'ವೆಬ್‌ಸೈಟ್ ಅಭಿವೃದ್ಧಿ • ವೆಬ್ ಹೋಸ್ಟಿಂಗ್ • ಡೊಮೇನ್‌ಗಳು • ಬೆಂಬಲ',
    ml: 'വെബ്സൈറ്റ് വികസനം • വെബ് ഹോസ്റ്റിംഗ് • ഡൊമെയ്നുകൾ • പിന്തുണ',
    pt: 'Desenvolvimento Web • Hospedagem Web • Domínios • Suporte',
    ru: 'Разработка сайтов • Веб-хостинг • Домены • Поддержка',
    ja: 'Webサイト制作 • Webホスティング • ドメイン • 専任サポート',
    'zh-CN': '网站开发 • 网页主机 • 域名注册 • 技术支持',
  },
  'hero.tagline': {
    en: 'BUILDING DIGITAL SUCCESS',
    hi: 'डिजिटल सफलता का निर्माण',
    es: 'CONSTRUYENDO EL ÉXITO DIGITAL',
    fr: 'BÂTIR LE SUCCÈS NUMÉRIQUE',
    de: 'DIGITALEN ERFOLG GESTALTEN',
    ar: 'بناء النجاح الرقمي',
    bn: 'ডিজিটাল সাফল্য তৈরি করা',
    ta: 'டிஜிட்டல் வெற்றியை உருவாக்குதல்',
    te: 'డిజిటల్ విజయాన్ని నిర్మించడం',
    mr: 'डिजिटल यशाची उभारणी',
    gu: 'ડિજિટલ સફળતાનું નિર્માણ',
    kn: 'ಡಿಜಿಟಲ್ ಯಶಸ್ಸನ್ನು ನಿರ್ಮಿಸುವುದು',
    ml: 'ഡിജിറ്റൽ വിജയം കെട്ടിപ്പടുക്കുന്നു',
    pt: 'CONSTRUINDO O SUCESSO DIGITAL',
    ru: 'СОЗДАНИЕ ЦИФРОВОГО УСПЕХА',
    ja: 'デジタルの成功を構築する',
    'zh-CN': '打造数字化成功',
  },
  'hero.desc': {
    en: 'We build fast, secure and modern websites, high-speed web hosting, domain infrastructure, and dedicated technical solutions that help your business thrive online.',
    hi: 'हम तेज़, सुरक्षित और आधुनिक वेबसाइटें, हाई-स्पीड वेब होस्टिंग, डोमेन इंफ्रास्ट्रक्चर और समर्पित तकनीकी समाधान बनाते हैं जो आपके व्यवसाय को ऑनलाइन विकसित करने में मदद करते हैं।',
    es: 'Construimos sitios web rápidos, seguros y modernos, alojamiento web de alta velocidad, infraestructura de dominios y soluciones técnicas dedicadas para hacer crecer su negocio en línea.',
    fr: 'Nous créons des sites Web rapides, sécurisés et modernes, des hébergements ultra-rapides et des solutions techniques dédiées pour développer votre activité en ligne.',
    de: 'Wir erstellen schnelle, sichere und moderne Websites, Hochgeschwindigkeits-Webhosting und maßgeschneiderte Lösungen für Ihren digitalen Geschäftserfolg.',
    ar: 'نقوم بإنشاء مواقع ويب سريعة وآمنة وحديثة واستضافة سحابية عالية الأداء وحلول تقنية مخصصة لنمو أعمالك.',
    bn: 'আমরা দ্রুত, সুরক্ষিত এবং আধুনিক ওয়েবসাইট, হাই-স্পিড ওয়েব হোস্টিং এবং কাস্টম ডিজিটাল সমাধান তৈরি করি যা আপনার ব্যবসাকে অনলাইনে এগিয়ে নিতে সাহায্য করে।',
    ta: 'உங்கள் வணிகத்தை ஆன்லைனில் வளர்க்க வேகமான, பாதுகாப்பான, நவீன வலைத்தளங்கள், வேகமான ஹோஸ்டிங் மற்றும் தொழில்நுட்ப ஆதரவை நாங்கள் வழங்குகிறோம்.',
    te: 'మీ వ్యాపారాన్ని ఆన్‌లైన్‌లో విస్తరించడానికి వేగవంతమైన, సురక్షితమైన ఆధునిక వెబ్‌సైట్‌లు, వెబ్ హోస్టింగ్ మరియు సాంకేతిక పరిష్కారాలను మేము అందిస్తాము.',
    mr: 'आम्ही वेगवान, सुरक्षित आणि आधुनिक वेबसाइट्स, हाय-स्पीड वेब होस्टिंग आणि समर्पित तांत्रिक उपाय तयार करतो जे तुमच्या व्यवसायाला ऑनलाइन वाढण्यास मदत करतात.',
    gu: 'અમે ઝડપી, સુરક્ષિત અને આધુનિક વેબસાઇટ્સ, હાઇ-સ્પીડ વેબ હોસ્ટિંગ અને સમર્પિત તકનીકી સોલ્યુશન્સ બનાવીએ છીએ જે તમારા વ્યવસાયને ઓનલાઇન વધારવામાં મદદ કરે છે.',
    kn: 'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬೆಳೆಸಲು ನಾವು ವೇಗದ, ಸುರಕ್ಷಿತ ಮತ್ತು ಆಧುನಿಕ ವೆಬ್‌ಸೈಟ್‌ಗಳು, ವೆಬ್ ಹೋಸ್ಟಿಂಗ್ ಮತ್ತು ತಾಂತ್ರಿಕ ಪರಿಹಾರಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.',
    ml: 'നിങ്ങളുടെ ബിസിനസ്സ് ഓൺലൈനിൽ വളർത്താൻ വേഗതയേറിയതും സുരക്ഷിതവുമായ ആധുനിക വെബ്സൈറ്റുകളും വെബ് ഹോസ്റ്റിംഗും ഞങ്ങൾ നിർമ്മിക്കുന്നു.',
    pt: 'Desenvolvemos sites rápidos, seguros e modernos, hospedagem de alto desempenho e soluções sob medida para sua empresa crescer online.',
    ru: 'Мы создаем быстрые, безопасные и современные веб-сайты, сверхбыстрый хостинг и надежные решения для роста вашего бизнеса в сети.',
    ja: '高速でセキュア、洗練されたモダンなWebサイト制作、高速ホスティング、ビジネスの成長を支援する技術ソリューションを提供します。',
    'zh-CN': '我们打造快速、安全、现代的定制网站、高速网页主机与专属数字化解决方案，助力您的业务在互联网上蓬勃发展。',
  },
  'lang.selectTitle': {
    en: 'Select Language / भाषा चुनें',
    hi: 'भाषा चुनें / Select Language',
    es: 'Seleccionar idioma',
    fr: 'Choisir la langue',
    de: 'Sprache wählen',
    ar: 'اختر اللغة',
    bn: 'ভাষা নির্বাচন করুন',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    te: 'భాషను ఎంచుకోండి',
    mr: 'भाषा निवडा',
    gu: 'ભાષા પસંદ કરો',
    kn: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    ml: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    pt: 'Selecionar Idioma',
    ru: 'Выберите язык',
    ja: '言語を選択',
    'zh-CN': '选择语言',
  },
  'lang.searchPlaceholder': {
    en: 'Search language or country (e.g. Hindi, Spanish, Arabic, French)...',
    hi: 'भाषा या देश खोजें (जैसे हिन्दी, English, Spanish)...',
    es: 'Buscar idioma o país...',
    fr: 'Rechercher une langue ou un pays...',
    de: 'Sprache oder Land suchen...',
    ar: 'ابحث عن اللغة أو الدولة...',
    bn: 'ভাষা বা দেশ খুঁজুন...',
    ta: 'மொழி அல்லது நாட்டைத் தேடுங்கள்...',
    te: 'భాష లేదా దేశాన్ని శోధించండి...',
    mr: 'भाषा किंवा देश शोधा...',
    gu: 'ભાષા અથવા દેશ શોધો...',
    kn: 'ಭಾಷೆ ಅಥವಾ ದೇಶವನ್ನು ಹುಡುಕಿ...',
    ml: 'ഭാഷ അല്ലെങ്കിൽ രാജ്യം തിരയുക...',
    pt: 'Buscar idioma ou país...',
    ru: 'Поиск языка или страны...',
    ja: '言語または国名を検索...',
    'zh-CN': '搜索语言或国家（例如中文、英语、印地语）...',
  },
};

interface LanguageContextType {
  currentLanguage: LanguageOption;
  setLanguage: (code: string) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sirinbuilds_language_preference';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(() => {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCode) {
      const match = SUPPORTED_LANGUAGES.find((lang) => lang.code === savedCode);
      if (match) return match;
    }
    return SUPPORTED_LANGUAGES[0]; // Default English
  });

  // Apply RTL/LTR and HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir || 'ltr';

    // Store in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, currentLanguage.code);

    // Initialize Google Translate dynamic element if selecting a non-English language
    if (currentLanguage.code !== 'en') {
      applyGoogleTranslation(currentLanguage.code);
    } else {
      resetGoogleTranslation();
    }
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    const found = SUPPORTED_LANGUAGES.find((l) => l.code === code || l.code.startsWith(code));
    if (found) {
      setCurrentLanguage(found);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const translations = UI_TRANSLATIONS[key];
    if (translations) {
      if (translations[currentLanguage.code]) {
        return translations[currentLanguage.code];
      }
      // Check partial match (e.g. 'zh' for 'zh-CN')
      const baseCode = currentLanguage.code.split('-')[0];
      if (translations[baseCode]) {
        return translations[baseCode];
      }
      if (translations.en) {
        return translations.en;
      }
    }
    return fallback || key;
  };

  const isRTL = currentLanguage.dir === 'rtl';

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        isRTL,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Helper to dynamically trigger translation for full page elements
 */
function applyGoogleTranslation(targetLang: string) {
  // Set cookie for google translate engine
  const cookieValue = `/en/${targetLang}`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;

  // Inject or update script if not present
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Global callback
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
  } else {
    // If already loaded, trigger combo change
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = targetLang;
      select.dispatchEvent(new Event('change'));
    }
  }
}

function resetGoogleTranslation() {
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
  }
}
