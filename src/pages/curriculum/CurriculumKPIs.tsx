import type { FC } from 'react';
import { BookOpen, AlertTriangle, GraduationCap, Layers } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { mockCurriculumAudits } from '../../mock';

export const CurriculumKPIs: FC = () => {
  const totalCourses = mockCurriculumAudits.length;
  const avgAlignment = (
    mockCurriculumAudits.reduce((acc, c) => acc + c.alignmentScorePct, 0) / totalCourses
  ).toFixed(1);

  const sortedByAlignment = [...mockCurriculumAudits].sort(
    (a, b) => a.alignmentScorePct - b.alignmentScorePct
  );
  const lowestCourse = sortedByAlignment[0];
  const criticalCount = mockCurriculumAudits.filter((c) => c.alignmentScorePct < 50).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Courses Audited"
        value={`${totalCourses} Syllabi`}
        change="Tier-2 & Tier-3 Focus"
        changeType="positive"
        icon={GraduationCap}
        subtitle="Accredited technical degree programs"
      />

      <StatCard
        title="Average Alignment Score"
        value={`${avgAlignment}%`}
        change="Sub-optimal"
        changeType="negative"
        icon={AlertTriangle}
        subtitle="Across monitored collegiate syllabi"
      />

      <StatCard
        title="Lowest Course Alignment"
        value={`${lowestCourse.alignmentScorePct}%`}
        change={lowestCourse.courseCode}
        changeType="negative"
        icon={BookOpen}
        subtitle={`${lowestCourse.courseName.split('&')[0].trim()}`}
      />

      <StatCard
        title="Critical Syllabus Deficits"
        value={`${criticalCount} Syllabi`}
        change="Under 50% Threshold"
        changeType="negative"
        icon={Layers}
        subtitle="Including DS-302 Analytics (46%)"
      />
    </div>
  );
};
