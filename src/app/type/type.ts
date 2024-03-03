export interface CourseData {
  [key: string]: {
    course?: string;
    classroom?: string;
    location?: string;
    classPeriodNumber?: number;
  }[];
}

export interface CourseRender {
  iconColor?: string | null | undefined;
  borderColor?: string | null | undefined;
  backgroundColor: string | null | undefined;
  course?: string | undefined;
  classroom?: string | undefined;
  location?: string | undefined;
  classPeriodNumber?: number | undefined;
}
[];

export interface CourseColors {
  borderColor: string;
  backgroundColor: string;
  iconColor: string;
}

export type CourseRenderArray = CourseRender[][];
