import { motion } from 'framer-motion';
import { ExternalLink, Code, Palette, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Moderno",
      category: "Tienda Online",
      description: "Diseño y desarrollo de una tienda online completa con sistema de pagos integrado y panel de administración.",
      image: "/home/ubuntu/upload/search_images/8AdY6w4vjrmS.jpg",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      results: {
        conversion: "+150%",
        traffic: "+200%",
        sales: "+300%"
      },
      link: "#"
    },
    {
      id: 2,
      title: "Landing Page SaaS",
      category: "Generación de Leads",
      description: "Landing page optimizada para conversión de una startup de software con formularios inteligentes.",
      image: "/home/ubuntu/upload/search_images/HYUON6SfAtlz.webp",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      results: {
        conversion: "+85%",
        leads: "+120%",
        bounce: "-40%"
      },
      link: "#"
    },
    {
      id: 3,
      title: "Portal Corporativo",
      category: "Sitio Web Empresarial",
      description: "Rediseño completo del sitio web corporativo con enfoque en experiencia de usuario y SEO.",
      image: "/home/ubuntu/upload/search_images/g33q2qtwhjew.jpg",
      technologies: ["WordPress", "PHP", "MySQL", "SEO"],
      results: {
        seo: "+180%",
        engagement: "+90%",
        speed: "+60%"
      },
      link: "#"
    },
    {
      id: 4,
      title: "App Web Interactiva",
      category: "Aplicación Web",
      description: "Aplicación web con elementos interactivos avanzados y animaciones personalizadas.",
      image: "/home/ubuntu/upload/search_images/cX55lv6MkASF.png",
      technologies: ["Vue.js", "Three.js", "GSAP", "Firebase"],
      results: {
        engagement: "+250%",
        retention: "+140%",
        satisfaction: "95%"
      },
      link: "#"
    },
    {
      id: 5,
      title: "Plataforma de Cursos",
      category: "E-learning",
      description: "Plataforma educativa con sistema de pagos, progreso de estudiantes y certificaciones.",
      image: "/home/ubuntu/upload/search_images/It4O7Mi78WxK.webp",
      technologies: ["React", "Express", "PostgreSQL", "AWS"],
      results: {
        students: "+500%",
        completion: "+75%",
        revenue: "+400%"
      },
      link: "#"
    },
    {
      id: 6,
      title: "Dashboard Analytics",
      category: "Panel de Control",
      description: "Dashboard interactivo para visualización de datos con gráficos en tiempo real.",
      image: "/home/ubuntu/upload/search_images/djZhIiGAUi4p.jpg",
      technologies: ["React", "D3.js", "Chart.js", "WebSocket"],
      results: {
        efficiency: "+120%",
        decisions: "+80%",
        time: "-50%"
      },
      link: "#"
    }
  ];

  const categories = ["Todos", "Tienda Online", "Generación de Leads", "Sitio Web Empresarial", "Aplicación Web", "E-learning", "Panel de Control"];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestro Portafolio
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Proyectos que transforman ideas en experiencias digitales exitosas
          </motion.p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-6 py-3 rounded-full border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-400 font-medium">{project.category}</span>
                    <Code className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                      Resultados
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-green-400 font-bold">{value}</div>
                          <div className="text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Transformemos tu idea en una experiencia digital exitosa
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Proyecto
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

