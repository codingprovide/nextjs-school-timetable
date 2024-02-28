export interface CourseData {
  [key: string]: {
    course?: string;
    classroom?: string;
    location?: string;
    classPeriodNumber?: number;
  }[];
}

export interface CourseRender {
  course?: string | undefined;
  classroom?: string | undefined;
  location?: string | undefined;
  classPeriodNumber?: number | undefined;
}
[];

export type CourseRenderArray = CourseRender[][];
