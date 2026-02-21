import { useMemo } from 'react';
import { lessons as allLessons, Lesson } from '@/data/lessons';
import { useUserLessons } from './useUserLessons';

export interface LessonWithStatus extends Lesson {
  userStatus?: 'Completed' | 'In Progress' | 'Locked';
}

export const useUserLessonsWithStatus = (userId: number | null) => {
  const { userLessons, refetch } = useUserLessons(userId);

  const lessonsWithStatus: LessonWithStatus[] = useMemo(() => {
    return allLessons.map((lesson) => {
      const userLesson = userLessons.find((ul) => ul.lesson_id === lesson.id);
      const userStatus = userLesson?.status as 'Completed' | 'In Progress' | 'Locked' | undefined;

      // Map database status to UI status
      let uiStatus: 'completed' | 'active' | 'locked' = 'locked';
      if (userStatus === 'Completed') {
        uiStatus = 'completed';
      } else if (userStatus === 'In Progress') {
        uiStatus = 'active';
      }

      return {
        ...lesson,
        status: uiStatus,
        userStatus: userStatus,
      };
    });
  }, [userLessons]);

  return { lessons: lessonsWithStatus, refetch };
};
