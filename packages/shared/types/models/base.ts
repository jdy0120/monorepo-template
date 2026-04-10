export interface BaseEntity {
  id: string;
  createdAt: string; // 또는 Date
  updatedAt: string;
}

// 만약 프로젝트에서 숫지형 ID를 쓴다면 제네릭을 쓸 수도 있습니다.
export interface BaseEntityWithId<T = string> {
  id: T;
  createdAt: string;
  updatedAt: string;
}

export type AsCreateRequest<T> = Omit<T, keyof BaseEntity>;

// 수정용 타입: BaseEntity의 필드를 제거하고 나머지를 Optional로 변경
export type AsUpdateRequest<T> = Partial<Omit<T, keyof BaseEntity>>;
