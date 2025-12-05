import { motion } from "framer-motion";
import { tradeModels } from "./TradeModels";
import ModelCard from "./ModelCard";
import TenixAIHeader from "./TenixAIHeader"; // ✅ Import the header

export default function Models() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Tenix AI Header */}
      <TenixAIHeader />

      {/* Add padding top so content is not hidden under the fixed header */}
      <div className="p-8 pt-24">

        {/* Page Header */}
       <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
            >
            <h1
                className="text-4xl font-extrabold mb-2 
                        bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                        text-transparent bg-clip-text"
            >
                All Models
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto">
               Explore detailed performance metrics for each trading model
            </p>
        </motion.div>

        {/* Models Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {tradeModels.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (i + 1) }}
            >
              <ModelCard {...model} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
