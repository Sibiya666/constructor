import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    EmbeddedViewRef,
    ApplicationRef,
    ComponentRef,
    ReflectiveInjector
} from '@angular/core';

import { PopupComponent } from './popup.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PopupService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }

    private getRootComponent(): ComponentRef<any> {
        const components = this.appRef['_rootComponents'];
        if (components.length) {
            return components[0];
        }
    }

    private getRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    }

    private componentsInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        const props = Object.keys(options);
        for ( const prop of props) {
            component.instance[prop] = options[prop];
        }
        return component;
    }

    openPopup() {
        const position = this.getRootNode(this.getRootComponent());
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        let componentRef = componentFactory.create(this.injector);
        const appRef = this.appRef;
        const componentRootNode = this.getRootNode(componentRef);
        const injector = ReflectiveInjector.resolveAndCreate([{
            provide: 'modal',
            useValue: componentRef
        }], this.injector);

        this.componentsInputs(componentRef, {options: {}, injector: injector});
        appRef.attachView(componentRef.hostView);

        componentRef.onDestroy(() => {
            appRef.detachView(componentRef.hostView);
            componentRef = null;
        });

        position.appendChild(componentRootNode);
    }

}

