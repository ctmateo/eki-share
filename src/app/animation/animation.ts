import { AnimationTriggerMetadata, animate, style, transition, trigger } from "@angular/animations";

export function rigthEnter(): AnimationTriggerMetadata {
    return trigger(
        'enterAnimation', [
        transition(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
    ]
    )
}

export function fadeIn(): AnimationTriggerMetadata {
    return trigger(
        'fadeElement', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({opacity: 1 }),
            animate('500ms', style({ opacity: 0 }))
        ])
    ]
    )
}