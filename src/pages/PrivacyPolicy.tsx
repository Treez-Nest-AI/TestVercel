import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tocItems = [
    { id: "introduction", label: "1. Introduction" },
    { id: "information-collection", label: "2. Information We Collect" },
    { id: "information-use", label: "3. How We Use Information" },
    { id: "information-sharing", label: "4. Information Sharing" },
    { id: "data-security", label: "5. Data Security" },
    { id: "cookies", label: "6. Cookies & Tracking" },
    { id: "your-rights", label: "7. Your Rights" },
    { id: "third-party", label: "8. Third-Party Services" },
    { id: "children", label: "9. Children's Privacy" },
    { id: "changes", label: "10. Policy Changes" },
    { id: "contact", label: "11. Contact Information" }
  ];

  return (
    <div className="bg-white text-foreground font-sans leading-relaxed min-h-screen">
      {/* Header */}
      

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <aside className="lg:w-80 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h2 className="font-semibold text-lg mb-4 text-foreground" data-testid="toc-title">
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-2 px-3 text-sm rounded-md transition-all ${
                      activeSection === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    data-testid={`toc-link-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Privacy Policy Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white">
              {/* Header Section */}
              <div className="mb-8 pb-8 border-b border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="privacy-policy-title">
                  Privacy Policy
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-muted-foreground" data-testid="privacy-subtitle">
                    Protecting your privacy is our priority
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Last Updated:</span>{" "}
                    <span data-testid="last-updated">December 15, 2024</span>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-10">
                {/* Introduction */}
                <section id="introduction">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-introduction">
                    1. Introduction
                  </h2>
                  <div className="prose prose-gray max-w-none space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      Welcome to <span className="font-medium">TEadifyz</span>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                    <p className="text-base leading-7 text-foreground">
                      We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Information Collection */}
                <section id="information-collection">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-information-collection">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-3 text-foreground">Personal Information</h3>
                      <p className="text-base leading-7 text-foreground mb-3">
                        We may collect personal information that you voluntarily provide to us when you:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-foreground">
                        <li>Register for an account</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Contact us directly</li>
                        <li>Participate in surveys or promotions</li>
                        <li>Use our services or make purchases</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-3 text-foreground">Automatically Collected Information</h3>
                      <p className="text-base leading-7 text-foreground">
                        When you visit our website, we may automatically collect certain information about your device and usage patterns, including IP address, browser type, operating system, referring URLs, and pages visited.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Information Use */}
                <section id="information-use">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-information-use">
                    3. How We Use Your Information
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      We use the information we collect about you for various purposes, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-foreground">
                      <li>Providing and maintaining our services</li>
                      <li>Processing transactions and sending related information</li>
                      <li>Sending administrative information and updates</li>
                      <li>Responding to your inquiries and providing customer support</li>
                      <li>Improving our website and services</li>
                      <li>Personalizing your experience</li>
                      <li>Conducting analytics and research</li>
                      <li>Complying with legal obligations</li>
                    </ul>
                  </div>
                </section>

                {/* Information Sharing */}
                <section id="information-sharing">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-information-sharing">
                    4. Information Sharing and Disclosure
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <h4 className="font-medium text-foreground mb-2">Service Providers</h4>
                        <p className="text-sm text-muted-foreground">With trusted third-party service providers who assist us in operating our website and conducting our business.</p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <h4 className="font-medium text-foreground mb-2">Legal Requirements</h4>
                        <p className="text-sm text-muted-foreground">When required by law, regulation, or legal process, or to protect our rights and safety.</p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <h4 className="font-medium text-foreground mb-2">Business Transfers</h4>
                        <p className="text-sm text-muted-foreground">In connection with any merger, sale of assets, or acquisition of our business.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-data-security">
                    5. Data Security
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="bg-accent/50 border border-border rounded-lg p-6">
                      <h4 className="font-medium text-foreground mb-3">Our Security Measures Include:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-foreground">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments and updates</li>
                        <li>Access controls and authentication procedures</li>
                        <li>Employee training on data protection</li>
                        <li>Incident response and monitoring systems</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                {/* Cookies */}
                <section id="cookies">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-cookies">
                    6. Cookies and Tracking Technologies
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us improve our services and your user experience.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Essential Cookies</h4>
                        <p className="text-sm text-muted-foreground">Required for the website to function properly and cannot be disabled.</p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Analytics Cookies</h4>
                        <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website.</p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Preference Cookies</h4>
                        <p className="text-sm text-muted-foreground">Remember your settings and preferences for future visits.</p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Marketing Cookies</h4>
                        <p className="text-sm text-muted-foreground">Used to deliver relevant advertisements and track campaign effectiveness.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-your-rights">
                    7. Your Privacy Rights
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Right to Access</h4>
                          <p className="text-sm text-muted-foreground">Request access to your personal information we hold.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Right to Rectification</h4>
                          <p className="text-sm text-muted-foreground">Request correction of inaccurate or incomplete information.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Right to Erasure</h4>
                          <p className="text-sm text-muted-foreground">Request deletion of your personal information under certain circumstances.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Right to Data Portability</h4>
                          <p className="text-sm text-muted-foreground">Request your data in a structured, machine-readable format.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Right to Object</h4>
                          <p className="text-sm text-muted-foreground">Object to processing of your personal information for certain purposes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third Party Services */}
                <section id="third-party">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-third-party">
                    8. Third-Party Services
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                    </p>
                    <div className="bg-muted/30 border border-border rounded-lg p-6">
                      <h4 className="font-medium text-foreground mb-3">Third-Party Services We Use:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Google Analytics (for website analytics)</li>
                        <li>• Payment processors (for transaction processing)</li>
                        <li>• Email service providers (for communications)</li>
                        <li>• Social media platforms (for social features)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-children">
                    9. Children's Privacy
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
                    </p>
                    <div className="bg-accent/50 border border-border rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        <strong>Parents and Guardians:</strong> If you believe your child has provided personal information to us, please contact us immediately so we can remove the information.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Policy Changes */}
                <section id="changes">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-changes">
                    10. Changes to This Privacy Policy
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base leading-7 text-foreground">
                      We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy.
                    </p>
                    <p className="text-base leading-7 text-foreground">
                      For significant changes, we will provide additional notice, such as sending an email notification or displaying a prominent notice on our website before the changes take effect.
                    </p>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground" data-testid="section-title-contact">
                    11. Contact Information
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base leading-7 text-foreground">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the information below:
                    </p>
                    
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h4 className="font-medium text-foreground mb-4">Privacy Officer Contact Information</h4>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-foreground">Email</div>
                            <div className="text-sm text-muted-foreground" data-testid="contact-email">
                              privacy@yourcompany.com
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Phone</div>
                            <div className="text-sm text-muted-foreground" data-testid="contact-phone">
                              +1 (555) 123-4567
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-foreground">Mailing Address</div>
                            <div className="text-sm text-muted-foreground" data-testid="contact-address">
                              Your Company<br />
                              123 Privacy Street<br />
                              Suite 456<br />
                              City, State 12345
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        <strong>Response Time:</strong> We will respond to your privacy-related inquiries within 30 days of receipt, or as required by applicable law.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    This Privacy Policy is effective as of <span data-testid="effective-date">December 15, 2024</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    © <span data-testid="current-year">2024</span> <span data-testid="footer-company-name">Your Company</span>. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 opacity-90 hover:opacity-100"
        data-testid="scroll-to-top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
