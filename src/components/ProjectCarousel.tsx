
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Comic3DPanel from './Comic3DPanel';
import SkillBadge from './SkillBadge';
import { useSound } from '../contexts/SoundContext';

interface ProjectCarouselProps {
  projects: Project[];
  onViewDetails: (id: number) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onViewDetails }) => {
  const { playSound } = useSound();

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => playSound('hover')}
              >
                <Comic3DPanel 
                  title={project.title}
                  headerColor={project.skills[0]?.color || 'blue'}
                  backgroundImage={project.image}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="font-comic mb-4 line-clamp-3 text-white">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color} 
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                    <button 
                      className="comic-button mt-4 text-sm w-full bg-gradient-to-r from-comic-blue to-comic-purple hover:from-comic-purple hover:to-comic-blue text-white"
                      onClick={() => {
                        onViewDetails(project.id);
                        playSound('click');
                      }}
                    >
                      See Details
                    </button>
                  </div>
                </Comic3DPanel>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          onClick={() => playSound('whoosh')}
          className="bg-gray-800 text-white border-comic-border hover:bg-gray-700"
        />
        <CarouselNext 
          onClick={() => playSound('whoosh')}
          className="bg-gray-800 text-white border-comic-border hover:bg-gray-700"
        />
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;
