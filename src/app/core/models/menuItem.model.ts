export interface MenuItem {
    label?: string;
    icon?: string;
    to?: string;
    items?: MenuItem[];
    separator?: boolean;
}