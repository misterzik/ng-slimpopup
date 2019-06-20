export interface Theme {
    title: string;
    left_image?: string;
    right_image?: string;
}

export interface Db {
    url: string;
}

export interface ButtonsLeft {
    label?: string;
    color?: string;
    class?: string;
}

export interface ButtonsRight {
    label?: string;
    color?: string;
    class?: string;
}

export interface ButtonsFork {
    left: ButtonsLeft;
    right: ButtonsRight;
}

export interface Selector {
    id: string;
}

export interface Debug {
    enabled?: boolean;
}

export interface InitButton {
    selector: string;
    label: string;
    color: string;
    class?: string;
}

export interface SlimConfig {
    theme: Theme;
    db: Db;
    buttons: ButtonsFork;
    selector: Selector;
    debug?: Debug;
    init_button: InitButton;
}


