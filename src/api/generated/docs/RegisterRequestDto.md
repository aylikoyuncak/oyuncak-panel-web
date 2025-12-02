# RegisterRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**phoneNumber** | **string** |  | [optional] [default to undefined]
**password** | **string** |  | [optional] [default to undefined]
**confirmPassword** | **string** |  | [optional] [default to undefined]
**contactPermission** | **boolean** |  | [optional] [default to undefined]
**role** | **number** |  | [optional] [default to undefined]
**childName** | **string** |  | [optional] [default to undefined]
**childGender** | [**Genders**](Genders.md) |  | [optional] [default to undefined]
**boxNumber** | [**Box**](Box.md) |  | [optional] [default to undefined]
**items** | [**Array&lt;RegisterItemDto&gt;**](RegisterItemDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RegisterRequestDto } from './api';

const instance: RegisterRequestDto = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    contactPermission,
    role,
    childName,
    childGender,
    boxNumber,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
