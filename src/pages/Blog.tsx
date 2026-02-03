import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">
              Credit Education Blog
            </h1>
            <p className="text-xl text-[hsl(var(--on-dark))] opacity-80 max-w-2xl mx-auto">
              Stay informed with the latest insights on credit building, tradelines, and financial education. New articles published weekly.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="gradient-card border-border animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-display text-primary mb-4">Coming Soon</h2>
                <p className="text-foreground/80 max-w-md mx-auto mb-8">
                  Our blog is launching soon with weekly articles on credit education, tradeline strategies, and financial tips.
                </p>
                <Link to="/contact">
                  <Button className="font-display box-glow" data-cta="assessment">
                    Get Notified When We Launch
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="gradient-card border-border h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="font-display text-primary text-lg line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-foreground/60">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="text-primary text-sm font-medium flex items-center gap-1">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display text-primary mb-4">
              Ready to Strengthen Your Credit Profile?
            </h2>
            <p className="text-[hsl(var(--on-dark))] opacity-80 mb-8">
              Get a free assessment to learn how tradelines may help your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="font-display box-glow" data-cta="assessment">
                  Start Free Assessment
                </Button>
              </Link>
              <a href="tel:9087675309">
                <Button variant="outline" className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-cta="call">
                  Call (908) 767-5309
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;