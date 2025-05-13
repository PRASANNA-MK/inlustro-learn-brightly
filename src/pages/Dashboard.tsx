
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { currentUser, subjects, weeklyActivity, badges } from '@/data/mockData';

const Dashboard = () => {
  const earnedBadges = badges.filter(badge => badge.earned).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Continue your learning journey and track your progress.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Level</CardTitle>
            <CardDescription>Current progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold">{currentUser.level}</p>
                <p className="text-sm text-muted-foreground">Level</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">XP: {currentUser.xp} / 4000</p>
                </div>
                <div className="h-2 w-40 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-inlustro-blue" style={{ width: `${(currentUser.xp / 4000) * 100}%` }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Badges</CardTitle>
            <CardDescription>Your latest achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-inlustro-blue to-inlustro-blue-dark flex items-center justify-center">
                    <img src={badge.imageUrl} alt={badge.title} className="h-8 w-8" />
                  </div>
                  <p className="mt-1 text-xs">{badge.title}</p>
                </div>
              ))}
              {earnedBadges.length === 0 && (
                <p className="text-sm text-muted-foreground">No badges earned yet. Complete lessons and quizzes to earn badges!</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Class</CardTitle>
            <CardDescription>Your assigned class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1">
              <p className="text-2xl font-bold">{currentUser.class}</p>
              <p className="text-sm text-muted-foreground">Academic Year 2023-2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
            <CardDescription>Your progress in each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjects.map(subject => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <span className="text-xs text-muted-foreground">{subject.lessonsCompleted} / {subject.totalLessons} lessons</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-value" style={{ width: `${subject.progress}%`, backgroundColor: subject.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Minutes spent learning this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} min`, 'Study Time']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="minutes" fill="#33C3F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
