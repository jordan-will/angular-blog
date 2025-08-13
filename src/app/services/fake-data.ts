import { Injectable } from '@angular/core';
import { Card } from 'interfaces/card';
import { Post } from 'interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class FakeData {

  private posts: Post[] = [
    {
      id: '198gjd98a',
      title: 'Building Better Habits: A Guide to Lasting Change',
      description: 'Learn how to form habits that stick and transform your daily life.',
      cover: 'images/changes.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Building Better Habits: A Guide to Lasting Change\n', attributes: { header: 1 } },
          { insert: 'Habits shape our lives more than we realize. From morning routines to how we react to stress, our behaviors are often automatic. But with intention and strategy, we can reshape them.\n\n' },
          { insert: '🔁 The Habit Loop:\n', attributes: { bold: true } },
          { insert: 'Every habit follows a loop: cue → routine → reward. Understanding this cycle helps you identify triggers and replace negative patterns.\n\n' },
          { insert: '📅 Start Small:\n' },
          { insert: 'Instead of overhauling your life overnight, begin with one habit. Want to read more? Start with 5 minutes a day. Want to exercise? Begin with a 10-minute walk.\n\n' },
          { insert: '📈 Track Progress:\n' },
          { insert: 'Use a habit tracker or journal. Visual progress reinforces consistency and builds momentum.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Habits are powerful tools for personal growth. With patience and persistence, you can build a life aligned with your goals.\n' }
        ]
      }),
      authorId: '123456'
    },
    {
      id: '2876ddd990',
      title: 'Sunset Cliffs and Soul Searching: Why Nature Heals',
      description: 'Discover how time in nature can restore your mental and emotional balance.',
      cover: 'images/nature.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Sunset Cliffs and Soul Searching: Why Nature Heals\n', attributes: { header: 1 } },
          { insert: 'Standing on a cliff at sunset, watching the sky melt into hues of orange and gold, something shifts inside. Nature has a way of grounding us, reminding us of our place in the world.\n\n' },
          { insert: '🌄 The Science of Nature Therapy:\n', attributes: { bold: true } },
          { insert: 'Studies show that spending time outdoors reduces cortisol levels, lowers blood pressure, and improves mood. Forest bathing, hiking, or simply sitting in a park can have measurable effects on mental health.\n\n' },
          { insert: '🧘 Mindfulness in the Wild:\n' },
          { insert: 'Nature encourages presence. The rustle of leaves, the rhythm of waves, the warmth of sunlight—all invite us to slow down and breathe.\n\n' },
          { insert: '📍 Travel Tip:\n' },
          { insert: 'Seek out quiet places. Whether it’s a mountain trail or a coastal overlook, solitude in nature can be deeply restorative.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Nature doesn’t just heal—it transforms. Make space for it in your life and let the outdoors renew your spirit.\n' }
        ]
      }),
      authorId: '654321'
    },
    {
      id: '304ddos009',
      title: 'Mental Wellness: Daily Practices for a Calmer Mind',
      description: 'Simple routines to reduce stress and improve emotional resilience.',
      cover: 'images/mental-healthy.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Mental Wellness: Daily Practices for a Calmer Mind\n', attributes: { header: 1 } },
          { insert: 'In a fast-paced world, mental wellness is more important than ever. You don’t need a retreat or a therapist to begin—just a few intentional habits.\n\n' },
          { insert: '🧘 Morning Rituals:\n', attributes: { bold: true } },
          { insert: '- Start with deep breathing or meditation\n- Avoid screens for the first 30 minutes\n- Set a daily intention\n\n' },
          { insert: '📓 Journaling:\n' },
          { insert: 'Writing down your thoughts helps declutter your mind. Try gratitude journaling or stream-of-consciousness writing.\n\n' },
          { insert: '🚶 Movement:\n' },
          { insert: 'Exercise releases endorphins and reduces anxiety. Even a short walk can reset your mood.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Mental wellness is a daily practice. With small steps, you can build emotional resilience and find peace in the everyday.\n' }
        ]
      }),
      authorId: '123456'
    },
    {
      id: '8793dkd022',
      title: 'The Science of Effective Work Habits',
      description: 'Boost productivity with proven strategies for better focus and time management.',
      cover: 'images/habit.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'The Science of Effective Work Habits\n', attributes: { header: 1 } },
          { insert: 'Working smarter isn’t just about tools—it’s about habits. Research shows that consistent routines and mindful planning can dramatically improve productivity.\n\n' },
          { insert: '🧠 Key Principles:\n', attributes: { bold: true } },
          { insert: '- Time blocking: Allocate specific hours for deep work.\n- Pomodoro technique: Work in 25-minute bursts with short breaks.\n- Task batching: Group similar tasks to reduce context switching.\n\n' },
          { insert: '📅 Weekly Planning:\n' },
          { insert: 'Start each week by identifying your top priorities. Use a planner or digital tool to schedule tasks and meetings. Leave buffer time for unexpected events.\n\n' },
          { insert: '🧘 Mental Health:\n' },
          { insert: 'Avoid burnout by taking regular breaks, staying hydrated, and disconnecting after work hours. A healthy mind is key to sustainable productivity.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Effective work habits are built over time. Start small, stay consistent, and watch your output grow.\n' }
        ]
      }),
      authorId: '654321'
    },
    {
      id: '69873jdks92',
      title: 'Fitness at Home: No Gym Required',
      description: 'Stay active and healthy with simple home workouts and routines.',
      cover: 'images/fitness.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Fitness at Home: No Gym Required\n', attributes: { header: 1 } },
          { insert: 'You don’t need fancy equipment or a gym membership to stay fit. With a few basic moves and a little discipline, you can build strength and endurance right at home.\n\n' },
          { insert: '🏋️ Core Exercises:\n', attributes: { bold: true } },
          { insert: '- Push-ups: Great for chest and arms\n- Squats: Strengthen legs and glutes\n- Planks: Build core stability\n\n' },
          { insert: '🕒 Weekly Routine:\n' },
          { insert: 'Aim for 3–5 sessions per week. Mix cardio (jumping jacks, burpees) with strength training. Stretch before and after to prevent injury.\n\n' },
          { insert: '🍎 Nutrition Tips:\n' },
          { insert: 'Stay hydrated, eat whole foods, and avoid processed snacks. Fuel your body with lean proteins, vegetables, and complex carbs.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Consistency is key. Start small, track your progress, and celebrate every milestone.\n' }
        ]
      }),
      authorId: '123456'
    },
    {
      id: '7938392jdks9',
      title: 'Travel Smarter: Tips for Stress-Free Adventures',
      description: 'Make your next trip smoother with these practical travel hacks.',
      cover: 'images/travel.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Travel Smarter: Tips for Stress-Free Adventures\n', attributes: { header: 1 } },
          { insert: 'Traveling can be exciting—but also stressful. With the right preparation, you can avoid common pitfalls and enjoy the journey.\n\n' },
          { insert: '🧳 Packing Hacks:\n', attributes: { bold: true } },
          { insert: '- Roll clothes to save space\n- Use packing cubes for organization\n- Bring a reusable water bottle\n\n' },
          { insert: '📱 Tech Tools:\n' },
          { insert: '- Use apps like Google Maps, TripIt, and Duolingo\n- Download offline maps and boarding passes\n\n' },
          { insert: '🌍 Cultural Tips:\n' },
          { insert: 'Learn basic phrases in the local language. Respect customs and dress codes. Be open to new experiences.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'Smart travel is about planning and flexibility. Prepare well, stay curious, and enjoy the ride.\n' }
        ]
      }),
      authorId: '654321'
    },
    {
      id: '8377d9d992',
      title: 'Caring for Your Pet: A Guide to Happy Companions',
      description: 'Essential tips for keeping your furry friends healthy and joyful.',
      cover: 'images/pet.jpg',
      content: JSON.stringify({
        ops: [
          { insert: 'Caring for Your Pet: A Guide to Happy Companions\n', attributes: { header: 1 } },
          { insert: 'Pets bring joy, comfort, and companionship. To keep them happy and healthy, it’s important to understand their needs and behaviors.\n\n' },
          { insert: '🐾 Daily Care:\n', attributes: { bold: true } },
          { insert: '- Feed a balanced diet\n- Provide fresh water\n- Ensure regular exercise\n\n' },
          { insert: '🩺 Health Checks:\n' },
          { insert: 'Schedule annual vet visits. Watch for signs of illness like lethargy, appetite changes, or unusual behavior.\n\n' },
          { insert: '🎮 Mental Stimulation:\n' },
          { insert: 'Playtime is crucial. Use toys, puzzles, and training to keep your pet mentally engaged.\n\n' },
          { insert: '🎯 Conclusion:\n' },
          { insert: 'A well-cared-for pet is a happy pet. Build a routine, show affection, and enjoy the bond you share.\n' }
        ]
      }),
      authorId: '123456'
    }
  ];

  public get fakeData(): Post[] {
    return this.posts
  }

  public getPostById(id: string): Post | null {
    const post = this.posts.find(post => post.id === id)
    return post || null
  }

}
