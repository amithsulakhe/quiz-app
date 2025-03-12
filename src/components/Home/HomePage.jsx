

import { subjects } from '@/utils/constant'
import { motion } from "framer-motion"
import SubCardPage from './SubCardPage'




const HomePage = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Quiz Subject
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
            <SubCardPage key={subject.id} {...subject} index={index} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
