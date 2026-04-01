import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">{t("about")}</h1>
          <p className="text-primary-100 text-lg">{t("aboutSubtitle")}</p>
        </div>
      </div>

      {/* Mission */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
            alt="Mission"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("ourMission")}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {t("missionText")}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("missionDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("ourStory")}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t("storyText")}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("storyDesc")}
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
              alt="Our Story"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t("ourValues")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t("valQualityTitle"), description: t("valQualityDesc") },
            { title: t("valHealthTitle"), description: t("valHealthDesc") },
            { title: t("valSustainTitle"), description: t("valSustainDesc") },
          ].map((value, index) => (
            <div
              key={index}
              className="card p-8 text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-primary-600 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
