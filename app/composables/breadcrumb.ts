
interface BreadcrumbItem {
  text: string;
  url?: string;
}

const breadcrumbs = ref<BreadcrumbItem[]>([{ text: 'Home', url: '/' }]);

export const useBreadcrumb = () => {
  
  const setBreadcrumbs = (path: BreadcrumbItem[]) => {
    breadcrumbs.value = [...path];
  }

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
}
