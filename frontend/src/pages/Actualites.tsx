import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const blogPosts = [
  {
    id: 1,
    title: "Le Senang participe à la cérémonie d'ouverture des Jeux Olympiques de Paris 2024",
    excerpt: "Le Senang a accueilli les athlètes de la Mauritanie pour la cérémonie d'ouverture des Jeux Olympiques de Paris 2024. C'est avec une immense fierté que nous avons participé à cet événement historique.",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2024/10/WhatsApp-Image-2024-07-28-a-16.09.32_659cdf89-450x231.jpg",
    date: "28 juillet 2024",
    readTime: "3 min",
    category: "Événement",
    link: "https://bateau-a-paris.fr/le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024/",
  },
  {
    id: 2,
    title: "Tournage pour Adidas avec Nicolas Karabatic, Triple Médaillé Olympique",
    excerpt: "Cette semaine sur la Seine, le Senang devient le décor d'un tournage exceptionnel pour Adidas avec le champion Nicolas Karabatic.",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2024/06/Tournage-Exceptionnel-avec-Un-Bateau-a-Paris-450x231.png",
    date: "15 juin 2024",
    readTime: "4 min",
    category: "Tournage",
    link: "https://bateau-a-paris.fr/tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique/",
  },
  {
    id: 3,
    title: "Un Bateau à Paris aux Jeux Olympiques",
    excerpt: "Une nouvelle excitante pour les amateurs de sport et les passionnés de Paris ! Le Senang a été sélectionné pour participer aux cérémonies des JO 2024.",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2024/02/DALL%C2%B7E-2024-02-16-16.40.41-A-realistic-photo-showcasing-the-opening-ceremony-of-the-2024-Olympic-Games-specifically-set-on-the-River-Seine-in-Paris-France.-This-breathtaking-s-450x231.webp",
    date: "16 février 2024",
    readTime: "3 min",
    category: "Événement",
    link: "https://bateau-a-paris.fr/un-bateau-a-paris-aux-jeux-olympiques/",
  },
  {
    id: 4,
    title: "Shooting photo au pied de la Tour Eiffel",
    excerpt: "Capturer la Beauté de Paris à Bord du Senang : Un Shooting Photo Polyvalent. Imaginez un décor somptueux...",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-3-450x231.webp",
    date: "20 décembre 2023",
    readTime: "5 min",
    category: "Coulisses",
    link: "https://bateau-a-paris.fr/shooting-photo-au-pieds-de-la-tour-eiffel/",
  },
  {
    id: 5,
    title: "Une croisière romantique au crépuscule sur la Seine",
    excerpt: "Plongez dans une escapade enchanteresse au cœur de Paris avec une croisière romantique au crépuscule à bord du Senang.",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-1-450x231.webp",
    date: "15 décembre 2023",
    readTime: "4 min",
    category: "Inspiration",
    link: "https://bateau-a-paris.fr/une-croisiere-romantique-au-crepuscule-sur-la-seine-a-bord-du-senang/",
  },
  {
    id: 6,
    title: "Mémorable : une réunion de famille sur la Seine",
    excerpt: "Imaginez une journée spéciale en compagnie de votre famille, naviguant sur la Seine à bord du Senang...",
    image: "https://bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-2-450x231.webp",
    date: "10 décembre 2023",
    readTime: "3 min",
    category: "Témoignage",
    link: "https://bateau-a-paris.fr/une-reunion-de-famille-inoubliable-a-bord-du-senang-sur-la-seine/",
  },
];

// Instagram posts with images from the gallery
const instagramPosts = [
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-27-a-12.22.05_77ed38c8.webp", likes: 124, comments: 8 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-03-a-16.00.24_13d1702e.jpg", likes: 89, comments: 12 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-22.20.47_261af646.webp", likes: 156, comments: 15 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-22.20.42_88a4983b.webp", likes: 203, comments: 22 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-21.50.25_ac11bce0.webp", likes: 97, comments: 6 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-03-a-16.00.26_b41cf5f5.webp", likes: 178, comments: 19 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-20.58.31_fcc03538.webp", likes: 145, comments: 11 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-02-a-21.18.40_52501437.webp", likes: 112, comments: 9 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-04-a-17.33.30_ea0b05c2.webp", likes: 234, comments: 28 },
];

const categories = ["Tout", "Événement", "Tournage", "Coulisses", "Inspiration", "Témoignage"];

const Actualites = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const { isDark } = useThemeVariant();

  const filteredPosts = activeCategory === "Tout"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />

      <main className="pt-24 pb-16">
        {/* Page Header */}
        <div className="container-custom mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-4">
              Actualités
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Suivez les dernières nouvelles du Senang, nos événements et nos aventures sur la Seine.
            </p>
          </motion.div>
        </div>

        {/* Blog Section */}
        <section className="container-custom mb-24">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : isDark
                    ? "bg-white/10 text-muted-foreground hover:bg-white/15"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <motion.a
              href={filteredPosts[0].link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="block mb-12 group"
            >
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-card border border-border card-hover">
                <div className="h-64 md:h-96 overflow-hidden">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent/20 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {filteredPosts[0].date}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    Lire l'article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.a>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post, i) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-xl overflow-hidden border border-border card-hover h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-accent/20 text-accent-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4">
                      Lire la suite
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Instagram Section */}
        <section className={`section-padding ${isDark ? "bg-[#0d1d35]" : "bg-secondary/30"}`}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Instagram className="w-6 h-6 text-primary" />
                <span className="font-heading text-lg text-primary">@bateau_a_paris</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-3">
                Suivez-nous sur Instagram
              </h2>
              <p className="text-muted-foreground">
                Les coulisses, les moments forts et l'ambiance à bord du Senang
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
              {instagramPosts.map((post, i) => (
                <motion.a
                  key={i}
                  href="https://www.instagram.com/bateau_a_paris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                >
                  <img
                    src={post.src}
                    alt="Instagram post"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                      <span className="flex items-center gap-1 text-sm font-medium">
                        <Heart className="w-4 h-4 fill-white" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium">
                        <MessageCircle className="w-4 h-4 fill-white" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild className="btn-gold">
                <a
                  href="https://www.instagram.com/bateau_a_paris/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Suivre sur Instagram
                  <ExternalLink className="w-3.5 h-3.5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterVariants />
    </div>
  );
};

export default Actualites;
