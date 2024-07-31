// pages/about.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="mb-8 text-4xl font-bold text-primary">Sobre Nosotros</h1>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-secundary">
          Nuestra Historia
        </h2>
        <p className="text-base leading-relaxed text-primary">
          Bienvenido a Tuki, tu fuente número uno para todo lo relacionado con
          Tecnologia. Estamos dedicados a ofrecerte lo mejor de Tecnologia, con
          un enfoque en fiabilidad, servicio al cliente y exclusividad.
        </p>
        <p className="mt-4 text-base leading-relaxed text-primary">
          Fundada en 1990 por Pepito, Tuki ha recorrido un largo camino desde
          sus inicios en Bogota D.C. Cuando Pepito comenzó, su pasión por Ganar
          dinero lo impulsó a dejar su trabajo, lo que le dio el empuje para
          convertir el trabajo duro y la inspiración en una tienda en línea en
          auge. Ahora servimos a clientes en toda Colombia, y estamos encantados
          de ser parte de la industria tecnologica.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-secundary">
          Nuestra Misión
        </h2>
        <p className="text-base leading-relaxed text-primary">
          Nuestra misión es proporcionar a nuestros clientes productos y
          servicios de la mejor calidad que satisfagan sus necesidades y superen
          sus expectativas. Creemos en crear una experiencia de compra que sea
          fluida, agradable y personalizada. Estamos comprometidos con la
          sostenibilidad, la innovación y la mejora continua en todos los
          aspectos de nuestro negocio.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-secundary">
          Nuestro Equipo
        </h2>
        <p className="text-base leading-relaxed text-primary">
          Somos un equipo de personas apasionadas que están dedicadas a
          ofrecerte los mejores productos y el mejor servicio al cliente.
          Nuestro equipo está compuesto por expertos en tecnologia, que siempre
          están listos para ayudarte con cualquier pregunta o inquietud que
          puedas tener. Creemos en construir relaciones sólidas con nuestros
          clientes y siempre estamos aquí para apoyarte.
        </p>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-secundary">
          Contáctanos
        </h2>
        <p className="text-base leading-relaxed text-primary">
          Si tienes alguna pregunta o comentario, no dudes en contactarnos.
          ¡Siempre estamos aquí para ayudarte!
        </p>
        <p className="mt-4 text-base leading-relaxed text-primary">
          Correo electrónico:
          <a href="mailto: info@tuki.com" className="link-navbar">
            info@tuki.com
          </a>
        </p>
        <p className="mt-4 text-base leading-relaxed text-primary">
          Teléfono:
          <a href="tel:+1234567890" className="link-navbar">
            +123 456 7890
          </a>
        </p>
        <p className="mt-4 text-base leading-relaxed text-primary">
          Dirección: Calle 123 # 123 - 312
        </p>
      </section>
    </div>
  );
};

export default About;
