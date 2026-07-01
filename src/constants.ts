/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Configuration Constants for the Engagement Digital Invitation
export const WEDDING_CONSTANTS = {
  groom: {
    fullName: "Wilson Dias",
    firstName: "Wilson",
    avatar: "/assets/images/romantic_couple_lineart_1782826706816.jpg", // can use our lineart as beautiful illustration
    bio: "Um homem determinado, focado no futuro e que encontrou em Sónia o verdadeiro amor e a parceira perfeita para toda a vida."
  },
  bride: {
    fullName: "Sónia Gonçalves",
    firstName: "Sónia",
    avatar: "/assets/images/romantic_couple_lineart_1782826706816.jpg",
    bio: "Uma mulher de sorriso contagiante, cheia de carinho e que viu em Wilson o seu porto seguro, o homem ideal com quem deseja construir uma família."
  },
  
  // Date and Time
  eventDate: "2026-08-29T20:00:00", // August 29, 2026 at 20:00
  dateFormatted: "Sábado, 29 de Agosto de 2026",
  timeFormatted: "20:00",
  
  // Location
  location: {
    venue: "Salão de Festa Suzymar",
    neighborhood: "Viana/Kapalanga",
    street: "Rua Norberto de Castro",
    city: "Luanda",
    fullAddress: "Salão de Festa Suzymar, Viana/Kapalanga, Rua Norberto de Castro, Luanda, Angola",
    googleMapsUrl: "https://maps.google.com/?q=Sal%C3%A3o+de+Festa+Suzymar+Viana+Rua+Norberto+de+Castro"
  },

  // Contact for RSVP
  contacts: {
    groom: {
      name: "Wilson Dias",
      phone: "+244 944 897 458",
      apiNumber: "244944897458"
    },
    bride: {
      name: "Sónia Gonçalves",
      phone: "+244 931 595 018",
      apiNumber: "244931595018"
    }
  },

  // Invitation Text
  invitationText: {
    intro: "Existem momentos que marcam para sempre as nossas vidas, e este é, para nós, um momento de grande felicidade.",
    body: "É com enorme alegria que partilhamos convosco o nosso pedido, o início de uma nova etapa repleta de amor, união e esperança no futuro.",
    highlight: "A vossa presença tornará este momento ainda mais especial e inesquecível.",
    heroQuote: "Com alegria nos nossos corações, convidamos você para celebrar o início da nossa história para sempre."
  },

  // Bank Accounts for Gifts
  bankAccounts: [
    {
      bankName: "Banco IBAN Angola",
      owner: "Wilson Dias",
      accountNumber: "0810188730159",
      iban: "0006-0000-0810-1887-30159",
      logoType: "BAI"
    },
    {
      bankName: "Banco IBAN Angola",
      owner: "Sónia Fernanda Bala Gonçalves",
      accountNumber: "2305828810137",
      iban: "0040-0000-2305-8288-10137",
      logoType: "BFA"
    }
  ],

  // Guest Manual Guidelines (from the PDF)
  guestManual: [
    {
      id: "presenca",
      title: "Contamos com a sua presença",
      description: "Por favor, confirme a sua presença até dia 15 de Agosto de 2026.",
      icon: "Users"
    },
    {
      id: "pontual",
      title: "Por favor, seja pontual",
      description: "A cerimónia iniciará impreterivelmente às 20h00.",
      icon: "Clock"
    },
    {
      id: "convidado",
      title: "Convidado não convida",
      description: "O convite é estritamente pessoal e intransmissível.",
      icon: "Mail"
    },
    {
      id: "uniao",
      title: "Comemore a nossa união",
      description: "Venha de coração aberto para vibrar e celebrar este amor connosco.",
      icon: "Sparkles"
    },
    {
      id: "castanho",
      title: "Castanho é a cor da noiva",
      description: "Pedimos encarecidamente que não usem roupas no tom castanho.",
      icon: "Shirt"
    },
    {
      id: "registar",
      title: "Registe os bons momentos",
      description: "Tire muitas fotos, grave vídeos e partilhe connosco o vosso olhar.",
      icon: "Camera"
    },
    {
      id: "aproveitar",
      title: "Aproveite cada momento",
      description: "Coma, beba, dance e divirta-se ao máximo nesta noite especial.",
      icon: "PartyPopper"
    },
    {
      id: "sorrir",
      title: "Sorria e seja muito feliz",
      description: "Traga a sua melhor energia e sorriso para partilhar connosco.",
      icon: "Smile"
    }
  ],

  // Timeline
  timeline: [
    {
      id: "comeco",
      category: "HISTÓRIA DE AMOR",
      title: "O Começo",
      description: "Nossos caminhos se cruzaram e percebemos que fomos feitos um para o outro.",
      badge: "heart"
    },
    {
      id: "pedido",
      category: "PEDIDO DE CASAMENTO",
      title: "O Pedido",
      description: "O momento em que dissemos 'Sim' para o início de uma nova jornada juntos.",
      badge: "message"
    },
    {
      id: "noivado",
      category: "29 DE AGOSTO DE 2026",
      title: "O Noivado",
      description: "A celebração oficial da nossa união com os nossos familiares e amigos mais próximos.",
      badge: "sparkles"
    },
    {
      id: "casamento",
      category: "EM BREVE",
      title: "O Casamento",
      description: "A grande celebração do nosso matrimônio. O próximo grande capítulo da nossa história.",
      badge: "calendar"
    }
  ],

  // Gallery Photos
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
      title: "Cúmplices",
      span: "md:col-span-1 md:row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      title: "Nosso Compromisso",
      span: "md:col-span-2 md:row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
      title: "Olhar de Amor",
      span: "md:col-span-1 md:row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
      title: "Unidos para Sempre",
      span: "md:col-span-1 md:row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
      title: "Celebração do Amor",
      span: "md:col-span-2 md:row-span-1"
    }
  ],

  // Music Option
  backgroundMusic: "/assets/audio/love-story.mp3" // Indila - Love Story by ViOLiNiA (Instrumental)
};
