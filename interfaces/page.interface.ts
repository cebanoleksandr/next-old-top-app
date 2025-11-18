export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export interface TopPageAdvantage {
  _id: string;
  title: string;
  description: string;
}

export interface HhData {
  _id: string;
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
}

export interface TopPageModal {
  alias: string;
  title: string;
  _id: string;
  firstCategory: TopLevelCategory;
  secondCategory: string;
  seoText: string;
  tagsTitle: string;
  tags: string[];
  category: string;
  advantages: TopPageAdvantage[];
  createdAt: Date;
  updatedAt: Date;
  hh?: HhData;
  metaTitle: string;
  metaDescription: string;
}
