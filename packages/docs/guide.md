# Guide
```javascript
export const getClass = (target: any): any => {
    return target.prototype ? target : target.constructor
}
```
