import React from 'react';
export type Locale = 'es' | 'en' | 'fr' | 'ca';
export type TranslationKey =
// Navbar
'inicio' | 'servicios' | 'por_que_elegirnos' | 'tecnologias' | 'proyectos' | 'contacto'
// Hero section
| 'hero_title' | 'hero_subtitle' | 'hero_cta_primary' | 'hero_cta_secondary' | 'hero_discover'
// Services section
| 'services_title' | 'services_subtitle' | 'services_quote' | 'service_web_title' | 'service_web_desc' | 'service_marketing_title' | 'service_marketing_desc' | 'service_consulting_title' | 'service_consulting_desc' | 'service_feature_1' | 'service_feature_2' | 'service_feature_3' | 'service_feature_4' | 'service_cta'
// Why choose us section
| 'why_choose_us_title' | 'why_choose_us_subtitle' | 'why_choose_us_innovation' | 'reason_punctual_title' | 'reason_punctual_desc' | 'reason_team_title' | 'reason_team_desc' | 'reason_quality_title' | 'reason_quality_desc' | 'reason_support_title' | 'reason_support_desc'
// Technologies section
| 'tech_title' | 'tech_subtitle' | 'tech_project_question' | 'tech_project_desc' | 'tech_project_cta'
// Projects section
| 'projects_title' | 'projects_subtitle' | 'view_details'
// Contact section
| 'contact_title' | 'contact_subtitle' | 'contact_info_title' | 'contact_phone' | 'contact_email' | 'contact_address' | 'contact_hours' | 'contact_form_title' | 'contact_form_name' | 'contact_form_email' | 'contact_form_phone' | 'contact_form_subject' | 'contact_form_message' | 'contact_form_submit' | 'contact_form_success'
// Footer
| 'footer_description' | 'footer_services' | 'footer_links' | 'footer_contact';
type TranslationsType = { [key in Locale]: { [key in TranslationKey]?: string } };
export const translations: TranslationsType = {
  es: {
    // Navbar
    inicio: 'Inicio',
    servicios: 'Servicios',
    por_que_elegirnos: 'Por qué elegirme',
    tecnologias: 'Tecnologías',
    proyectos: 'Proyectos',
    contacto: 'Contacto',
    // Hero section
    hero_title: 'Transformo ideas en soluciones digitales',
    hero_subtitle: 'Desarrollo web, marketing digital y consultoría tecnológica para potenciar tu negocio.',
    hero_cta_primary: 'Solicita tu cotización',
    hero_cta_secondary: 'Mis servicios',
    hero_discover: 'Descubre más',
    // Services section
    services_title: 'Mis Servicios',
    services_subtitle: 'Soluciones digitales personalizadas para impulsar el crecimiento de tu negocio',
    services_quote: '"La transformación digital no es solo sobre tecnología, es sobre crear experiencias que conecten con tus clientes."',
    service_web_title: 'Desarrollo Web',
    service_web_desc: 'Creo sitios web informativos y landing pages personalizadas con diseño responsivo y optimizadas para convertir visitantes en clientes.',
    service_marketing_title: 'Marketing Digital',
    service_marketing_desc: 'Desarrollo estrategias de marketing digital efectivas para aumentar la visibilidad de tu marca y generar más leads cualificados.',
    service_consulting_title: 'Consultoría Tecnológica',
    service_consulting_desc: 'Asesoro a pymes y emprendedores sobre las mejores soluciones tecnológicas para optimizar procesos y aumentar la productividad.',
    service_feature_1: 'Diseño personalizado y moderno',
    service_feature_2: 'Optimización para dispositivos móviles',
    service_feature_3: 'Integración con CMS',
    service_feature_4: 'SEO técnico incluido',
    service_cta: 'Solicitar información',
    // Why choose us section
    why_choose_us_title: '¿Por Qué Elegirme?',
    why_choose_us_subtitle: 'Me destaco por ofrecer soluciones personalizadas con un enfoque centrado en resultados',
    why_choose_us_innovation: 'Innovación en cada proyecto',
    reason_punctual_title: 'Entrega Puntual',
    reason_punctual_desc: 'Me comprometo a cumplir con los plazos establecidos, respetando tu tiempo y planificación.',
    reason_team_title: 'Experiencia Especializada',
    reason_team_desc: 'Cuento con certificaciones y especialización en las últimas tecnologías del mercado.',
    reason_quality_title: 'Calidad Garantizada',
    reason_quality_desc: 'Todos mis proyectos pasan por rigurosos controles de calidad antes de ser entregados.',
    reason_support_title: 'Soporte Continuo',
    reason_support_desc: 'Ofrezco soporte técnico y mantenimiento continuo después de la entrega del proyecto.',
    // Technologies section
    tech_title: 'Mis Tecnologías',
    tech_subtitle: 'Utilizo herramientas de vanguardia para crear soluciones digitales innovadoras',
    tech_project_question: '¿Tienes un proyecto en mente?',
    tech_project_desc: 'Estoy listo para ayudarte a convertir tu idea en realidad utilizando las mejores tecnologías del mercado.',
    tech_project_cta: 'Hablemos de tu proyecto',
    // Projects section
    projects_title: 'Proyectos Destacados',
    projects_subtitle: 'Explora algunos de mis casos de éxito más recientes',
    view_details: 'Ver detalles',
    // Contact section
    contact_title: 'Contacta Conmigo',
    contact_subtitle: 'Estoy listo para impulsar tu próximo proyecto digital',
    contact_info_title: 'Información de Contacto',
    contact_phone: 'Teléfono',
    contact_email: 'Email',
    contact_address: 'Dirección',
    contact_hours: 'Horario',
    contact_form_title: 'Envíame un Mensaje',
    contact_form_name: 'Nombre',
    contact_form_email: 'Email',
    contact_form_phone: 'Teléfono',
    contact_form_subject: 'Asunto',
    contact_form_message: 'Mensaje',
    contact_form_submit: 'Enviar Mensaje',
    contact_form_success: '¡Mensaje Enviado!',
    // Footer
    footer_description: 'Transformo ideas en soluciones digitales innovadoras para impulsar el crecimiento de tu negocio.',
    footer_services: 'Servicios',
    footer_links: 'Enlaces Rápidos',
    footer_contact: 'Contacto'
  },
  en: {
    // Navbar
    inicio: 'Home',
    servicios: 'Services',
    por_que_elegirnos: 'Why Choose Me',
    tecnologias: 'Technologies',
    proyectos: 'Projects',
    contacto: 'Contact',
    // Hero section
    hero_title: 'I transform ideas into digital solutions',
    hero_subtitle: 'Web development, digital marketing and technology consulting to boost your business.',
    hero_cta_primary: 'Request a quote',
    hero_cta_secondary: 'My services',
    hero_discover: 'Discover more',
    // Services section
    services_title: 'My Services',
    services_subtitle: 'Custom digital solutions to drive your business growth',
    services_quote: "igital transformation is not just about technology; it's about creating experiences that connect with your customers: 'Web Development'",
    service_web_desc: "I create informative websites and custom landing pages with responsive design optimized to convert visitors into customers.",
    service_marketing_title: 'Digital Marketing',
    service_marketing_desc: 'I develop effective digital marketing strategies to increase your brand visibility and generate more qualified leads.',
    service_consulting_title: 'Technology Consulting',
    service_consulting_desc: 'I advise SMEs and entrepreneurs on the best technological solutions to optimize processes and increase productivity.',
    service_feature_1: 'Custom modern design',
    service_feature_2: 'Mobile device optimization',
    service_feature_3: 'CMS integration',
    service_feature_4: 'Technical SEO included',
    service_cta: 'Request information',
    // Why choose us section
    why_choose_us_title: 'Why Choose Me?',
    why_choose_us_subtitle: 'I stand out for offering customized solutions with a results-focused approach',
    why_choose_us_innovation: 'Innovation in every project',
    reason_punctual_title: 'On-time Delivery',
    reason_punctual_desc: 'I commit to meeting established deadlines, respecting your time and planning.',
    reason_team_title: 'Specialized Experience',
    reason_team_desc: 'I have certifications and specialization in the latest market technologies.',
    reason_quality_title: 'Guaranteed Quality',
    reason_quality_desc: 'All my projects go through rigorous quality controls before delivery.',
    reason_support_title: 'Continuous Support',
    reason_support_desc: 'I offer technical support and continuous maintenance after project delivery.',
    // Technologies section
    tech_title: 'My Technologies',
    tech_subtitle: 'I use cutting-edge tools to create innovative digital solutions',
    tech_project_question: 'Do you have a project in mind?',
    tech_project_desc: 'I am ready to help you turn your idea into reality using the best technologies on the market.',
    tech_project_cta: "Let's talk about your project",
    // Projects section
    projects_title: 'Featured Projects',
    projects_subtitle: 'Explore some of my most recent success stories',
    view_details: 'View details',
    // Contact section
    contact_title: 'Contact Me',
    contact_subtitle: 'I am ready to boost your next digital project',
    contact_info_title: 'Contact Information',
    contact_phone: 'Phone',
    contact_email: 'Email',
    contact_address: 'Address',
    contact_hours: 'Hours',
    contact_form_title: 'Send Us a Message',
    contact_form_name: 'Name',
    contact_form_email: 'Email',
    contact_form_phone: 'Phone',
    contact_form_subject: 'Subject',
    contact_form_message: 'Message',
    contact_form_submit: 'Send Message',
    contact_form_success: 'Message Sent!',
    // Footer
    footer_description: 'I transform ideas into innovative digital solutions to drive your business growth.',
    footer_services: 'Services',
    footer_links: 'Quick Links',
    footer_contact: 'Contact'
  },
  fr: {
    // Navbar
    inicio: 'Accueil',
    servicios: 'Services',
    por_que_elegirnos: 'Pourquoi Me Choisir',
    tecnologias: 'Technologies',
    proyectos: 'Projets',
    contacto: 'Contact',
    // Hero section
    hero_title: 'Je transforme les idées en solutions numériques',
    hero_subtitle: 'Développement web, marketing digital et conseil technologique pour booster votre entreprise.',
    hero_cta_primary: 'Demander un devis',
    hero_cta_secondary: 'Mes services',
    hero_discover: 'Découvrir plus',
    // Services section
    services_title: 'Mes Services',
    services_subtitle: 'Solutions numériques personnalisées pour stimuler la croissance de votre entreprise',
    services_quote: '"La transformation numérique ne concerne pas seulement la technologie, il s\'agit de créer des expériences qui se connectent avec vos clients."',
    service_web_title: 'Développement Web',
    service_web_desc: "Je crée des sites web informatifs et des pages d'atterrissage personnalisées avec un design responsive optimisé pour convertir les visiteurs en clients.",
    service_marketing_title: 'Marketing Digital',
    service_marketing_desc: 'Je développe des stratégies de marketing digital efficaces pour augmenter la visibilité de votre marque et générer plus de leads qualifiés.',
    service_consulting_title: 'Conseil Technologique',
    service_consulting_desc: 'Je conseille les PME et les entrepreneurs sur les meilleures solutions technologiques pour optimiser les processus et augmenter la productivité.',
    service_feature_1: 'Design moderne personnalisé',
    service_feature_2: 'Optimisation pour appareils mobiles',
    service_feature_3: 'Intégration CMS',
    service_feature_4: 'SEO technique inclus',
    service_cta: 'Demander des informations',
    // Why choose us section
    why_choose_us_title: 'Pourquoi Me Choisir?',
    why_choose_us_subtitle: 'Je me distingue en offrant des solutions personnalisées avec une approche axée sur les résultats',
    why_choose_us_innovation: 'Innovation dans chaque projet',
    reason_punctual_title: 'Livraison Ponctuelle',
    reason_punctual_desc: 'Je m\'engage à respecter les délais établis, en respectant votre temps et votre planification.',
    reason_team_title: 'Expérience Spécialisée',
    reason_team_desc: 'Je dispose de certifications et de spécialisation dans les dernières technologies du marché.',
    reason_quality_title: 'Qualité Garantie',
    reason_quality_desc: "Tous mes projets passent par des contrôles de qualité rigoureux avant d'être livrés.",
    reason_support_title: 'Support Continu',
    reason_support_desc: 'J\'offre un support technique et une maintenance continue après la livraison du projet.',
    // Technologies section
    tech_title: 'Mes Technologies',
    tech_subtitle: 'J\'utilise des outils de pointe pour créer des solutions numériques innovantes',
    tech_project_question: 'Vous avez un projet en tête?',
    tech_project_desc: 'Je suis prêt à vous aider à transformer votre idée en réalité en utilisant les meilleures technologies du marché.',
    tech_project_cta: 'Parlons de votre projet',
    // Projects section
    projects_title: 'Projets Vedettes',
    projects_subtitle: 'Explorez certaines de mes réussites les plus récentes',
    view_details: 'Voir les détails',
    // Contact section
    contact_title: 'Contactez-Moi',
    contact_subtitle: 'Je suis prêt à booster votre prochain projet numérique',
    contact_info_title: 'Informations de Contact',
    contact_phone: 'Téléphone',
    contact_email: 'Email',
    contact_address: 'Adresse',
    contact_hours: 'Horaires',
    contact_form_title: 'Envoyez-Nous un Message',
    contact_form_name: 'Nom',
    contact_form_email: 'Email',
    contact_form_phone: 'Téléphone',
    contact_form_subject: 'Sujet',
    contact_form_message: 'Message',
    contact_form_submit: 'Envoyer le Message',
    contact_form_success: 'Message Envoyé!',
    // Footer
    footer_description: 'Je transforme les idées en solutions numériques innovantes pour stimuler la croissance de votre entreprise.',
    footer_services: 'Services',
    footer_links: 'Liens Rapides',
    footer_contact: 'Contact'
  },
  ca: {
    // Navbar
    inicio: 'Inici',
    servicios: 'Serveis',
    por_que_elegirnos: 'Per què triar-me',
    tecnologias: 'Tecnologies',
    proyectos: 'Projectes',
    contacto: 'Contacte',
    // Hero section
    hero_title: 'Transformo idees en solucions digitals',
    hero_subtitle: 'Desenvolupament web, màrqueting digital i consultoria tecnològica per impulsar el teu negoci.',
    hero_cta_primary: 'Sol·licita el teu pressupost',
    hero_cta_secondary: 'Els meus serveis',
    hero_discover: 'Descobreix més',
    // Services section
    services_title: 'Els Meus Serveis',
    services_subtitle: 'Solucions digitals personalitzades per impulsar el creixement del teu negoci',
    services_quote: '"La transformació digital no és només sobre tecnologia, és sobre crear experiències que connectin amb els teus clients."',
    service_web_title: 'Desenvolupament Web',
    service_web_desc: 'Creo llocs web informatius i pàgines d\'aterratge personalitzades amb disseny responsiu i optimitzades per convertir visitants en clients.',
    service_marketing_title: 'Màrqueting Digital',
    service_marketing_desc: 'Desenvolupo estratègies de màrqueting digital efectives per augmentar la visibilitat de la teva marca i generar més clients potencials qualificats.',
    service_consulting_title: 'Consultoria Tecnològica',
    service_consulting_desc: 'Aconsello a pimes i emprenedors sobre les millors solucions tecnològiques per optimitzar processos i augmentar la productivitat.',
    service_feature_1: 'Disseny personalitzat i modern',
    service_feature_2: 'Optimització per dispositius mòbils',
    service_feature_3: 'Integració amb CMS',
    service_feature_4: 'SEO tècnic inclòs',
    service_cta: 'Sol·licitar informació',
    // Why choose us section
    why_choose_us_title: 'Per Què Triar-me?',
    why_choose_us_subtitle: 'Em destaco per oferir solucions personalitzades amb un enfocament centrat en resultats',
    why_choose_us_innovation: 'Innovació en cada projecte',
    reason_punctual_title: 'Lliurament Puntual',
    reason_punctual_desc: 'Em comprometo a complir amb els terminis establerts, respectant el teu temps i planificació.',
    reason_team_title: 'Experiència Especialitzada',
    reason_team_desc: 'Compto amb certificacions i especialització en les últimes tecnologies del mercat.',
    reason_quality_title: 'Qualitat Garantida',
    reason_quality_desc: 'Tots els meus projectes passen per controls de qualitat rigorosos abans de ser lliurats.',
    reason_support_title: 'Suport Continu',
    reason_support_desc: 'Oferisc suport tècnic i manteniment continu després de la lliura del projecte.',
    // Technologies section
    tech_title: 'Les Meves Tecnologies',
    tech_subtitle: 'Utilitzo eines de vanguarda per crear solucions digitals innovadores',
    tech_project_question: 'Tens un projecte en ment?',
    tech_project_desc: 'Estic llest per ajudar-te a convertir la teva idea en realitat utilitzant les millors tecnologies del mercat.',
    tech_project_cta: 'Parlem del teu projecte',
    // Projects section
    projects_title: 'Projectes Destacats',
    projects_subtitle: 'Explora alguns dels meus casos d\'èxit més recents',
    view_details: 'Veure detalls',
    // Contact section
    contact_title: 'Contacta Amb Mi',
    contact_subtitle: 'Estic llest per impulsar el teu proper projecte digital',
    contact_info_title: 'Informació de Contacte',
    contact_phone: 'Telèfon',
    contact_email: 'Email',
    contact_address: 'Adreça',
    contact_hours: 'Horari',
    contact_form_title: 'Envia\'ns un Missatge',
    contact_form_name: 'Nom',
    contact_form_email: 'Email',
    contact_form_phone: 'Telèfon',
    contact_form_subject: 'Assumpte',
    contact_form_message: 'Missatge',
    contact_form_submit: 'Enviar Missatge',
    contact_form_success: 'Missatge Enviat!',
    // Footer
    footer_description: 'Transformo idees en solucions digitals innovadores per impulsar el creixement del teu negoci.',
    footer_services: 'Serveis',
    footer_links: 'Enllaços Ràpids',
    footer_contact: 'Contacte'
  }
};