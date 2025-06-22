
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onStartSession={() => {}} />
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
              <p className="text-gray-600 mb-4">
                We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Collection</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">What information do we collect?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Location data when you use our map features</li>
                  <li>Session information when you create or join coworking sessions</li>
                  <li>Usage data to improve our service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Information</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">How do we use your information?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To show you relevant coworking sessions</li>
                  <li>To improve our platform and user experience</li>
                  <li>To communicate with you about our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">External Services</h3>
                <p>
                  We use Mapbox for our mapping services. Please refer to Mapbox's privacy policy for information about how they handle your data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <div className="text-gray-600 space-y-2">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at privacy@coworking.live
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
