
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SiteNotice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onStartSession={() => {}} />
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Site Notice</h1>
          
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information pursuant to § 5 TMG</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Service Provider:</strong> coworking.live</p>
                <p><strong>Contact:</strong> info@coworking.live</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Liability for Contents</h3>
                <p>
                  As service providers, we are liable for own contents of these websites according to Sec. 7, Para. 1 of the TMG (Telemediengesetz – Tele Media Act by German law). However, according to Sec. 8 to 10 of the TMG, we as service providers are under no obligation to monitor third party information provided or stored on our website.
                </p>
                
                <h3 className="text-lg font-medium text-gray-700">Liability for Links</h3>
                <p>
                  Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Copyright</h2>
              <p className="text-gray-600">
                Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§ 44a et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SiteNotice;
