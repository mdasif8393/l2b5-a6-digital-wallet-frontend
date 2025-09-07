import { motion } from "framer-motion";
import CountUp from "react-countup";
import DigitalWallet from "../assets/images/digital wallet.jpg";

const stats = [
  { value: 8000, suffix: "+", label: "Creators on the platform" },
  { value: 3, suffix: "%", label: "Flat platform fee" },
  { value: 99.99, suffix: "%", label: "Uptime guarantee" },
  { value: 70, suffix: "M", label: "Paid out to creators" },
];

const About = () => {
  return (
    <section className="relative bg-black text-white">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <img
          src={DigitalWallet}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Top text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-indigo-400 font-medium"
        >
          Our track record
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-3xl sm:text-4xl font-bold max-w-2xl"
        >
          Trusted by thousands of creators worldwide
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-gray-300 max-w-2xl"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
          impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
        </motion.p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
            >
              <p className="text-3xl font-bold">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  decimals={stat.value % 1 !== 0 ? 2 : 0}
                />
                {stat.suffix}
              </p>
              <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
