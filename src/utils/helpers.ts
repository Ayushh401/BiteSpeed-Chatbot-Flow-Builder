export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getNodeTypeColor = (type: string): string => {
  switch (type) {
    case 'start':
      return 'bg-green-500';
    case 'message':
      return 'bg-blue-500';
    case 'input':
      return 'bg-orange-500';
    case 'condition':
      return 'bg-purple-500';
    case 'action':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};