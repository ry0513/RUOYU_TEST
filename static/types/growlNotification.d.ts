interface notify {
    description: string;
    closeTimeout: number;
    type: string;
    image: { visible: boolean };
}

declare const GrowlNotification: {
    notify: (notify: notify) => void;
};
