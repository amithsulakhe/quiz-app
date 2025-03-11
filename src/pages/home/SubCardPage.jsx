import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const MotionCard = motion(Card)

const SubCardPage = ({id, title, description, icon:Icon, color, index}) => {
    const navigate = useNavigate();

    const handleStartQuiz = (subjectId) => {
      navigate(`/quiz/${subjectId}`);
    }
  return (
         <MotionCard 
            key={id} 
            className="hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`absolute inset-0 ${color} opacity-50 group-hover:opacity-70 transition-opacity`} />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`p-2 rounded-lg ${color}`}
                >
                  <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </motion.div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </div>
              <CardDescription className="mt-2 text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test your knowledge in {title.toLowerCase()} with our comprehensive quiz.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end relative">
              <Button 
                onClick={() => handleStartQuiz(id)}
                className="cursor-pointer"
              >
                Start Quiz
              </Button>
            </CardFooter>
          </MotionCard>
  )
}

export default SubCardPage
