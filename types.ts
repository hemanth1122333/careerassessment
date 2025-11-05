
export type TestType = 'career' | 'personality' | 'skills';

export type View = 'student' | 'admin';

export interface Test {
  questions: string[];
}

export interface Tests {
  career: Test;
  personality: Test;
  skills: Test;
}

export interface Recommendation {
  career: string;
  reason: string;
}
