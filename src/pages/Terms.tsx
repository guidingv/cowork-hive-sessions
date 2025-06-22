
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onStartSession={() => {}} />
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using coworking.live, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  Permission is granted to temporarily use coworking.live for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Conduct</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">When using our service, you agree to:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information when creating sessions</li>
                  <li>Respect other users and maintain professional conduct</li>
                  <li>Not disrupt ongoing coworking sessions</li>
                  <li>Follow venue rules and regulations</li>
                  <li>Not use the service for illegal or unauthorized purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Hosting</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">As a session host, you are responsible for:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensuring you have permission to host at the chosen venue</li>
                  <li>Managing your session and participants appropriately</li>
                  <li>Providing accurate session information</li>
                  <li>Canceling sessions if you cannot attend</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600">
                In no event shall coworking.live or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modifications</h2>
              <p className="text-gray-600">
                coworking.live may revise these terms of service at any time without notice. By using this web site, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at terms@coworking.live
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
