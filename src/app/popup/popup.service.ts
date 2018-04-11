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
    componentRef: ComponentRef<any>;

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

    private componentsInputs(component: ComponentRef<any>, data: any): ComponentRef<any> {
        const props = Object.keys(data);
        for ( const prop of props) {
            component.instance[prop] = data[prop];
        }
        return component;
    }

    openPopup(data: any) {
        const position = this.getRootNode(this.getRootComponent());
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        this.componentRef = componentFactory.create(this.injector);
        const appRef = this.appRef;
        const componentRootNode = this.getRootNode(this.componentRef);
        const injector = ReflectiveInjector.resolveAndCreate([{
            provide: 'modal',
            useValue: this.componentRef
        }], this.injector);

        this.componentsInputs(this.componentRef, {options: data, injector: injector});
        appRef.attachView(this.componentRef.hostView);

        this.componentRef.instance.close.subscribe(x => {
            this.componentRef.destroy()
        })

        this.componentRef.onDestroy(() => {
            appRef.detachView(this.componentRef.hostView);
            this.componentRef = null;
        });

        position.appendChild(componentRootNode);
    }

    close() {
       return this.componentRef.destroy
    }

}

