export interface Contacto {
  via: string;
  direccion: string;
  enlace: string;
  icon?: string;
}

export const contactos: Contacto[] = [
  {
    via: "Email: ",
    direccion: "mailto:sergioadrianfernandez02@gmail.com",
    enlace: "sergioadrianfernandez02@gmail.com",
    icon: "/Contactos/Mail.png",
  },
  {
    via: "Whatsapp: ",
    direccion: "https://wa.me/5355528734",
    enlace: "+5355528734",
    icon: "/Contactos/Whatsapp.png",
  },
  {
    via: "Teléfono",
    direccion: "tel:+34612345678",
    enlace: "34612345678",
    icon: "/Contactos/llamar.png",
  },
  {
    via: "Instagram: ",
    direccion: "https://www.instagram.com/sergio_aff",
    enlace: "@sergio_aff",
    icon: "/Contactos/instagram.png",
  },
  {
    via: "Youtube: ",
    direccion: "https://www.facebook.com/sergio.aff",
    enlace: "Canal de youtube",
    icon: "/Contactos/youtube.png",
  },
  {
    via: "Facebook: ",
    direccion: "https://www.facebook.com/sergio.aff",
    enlace: "facebook",
    icon: "/Contactos/facebook.png",
  },
];
