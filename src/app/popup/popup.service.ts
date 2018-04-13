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
import { IAppStore } from '../app.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@Injectable()
export class PopupService {
    componentRef: ComponentRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef,
        // private store: Store<IAppStore>
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
        return new Promise(resolve  => {
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
            position.appendChild(componentRootNode);
    
            this.componentRef.onDestroy(() => {
                appRef.detachView(this.componentRef.hostView);
                this.componentRef = null;
            });
    
            this.componentRef.instance.close = (data) => {
    
                if(data) {
                    resolve(data)
                }
    
                this.componentRef.destroy();
            }
            
        })
        

    }
}

