# UserBaseModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**phoneNumber** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**accessToken** | **string** |  | [optional] [default to undefined]
**refreshToken** | **string** |  | [optional] [default to undefined]
**userStep** | [**UserSteps**](UserSteps.md) |  | [optional] [default to undefined]
**role** | [**Roles**](Roles.md) |  | [optional] [default to undefined]

## Example

```typescript
import { UserBaseModel } from './api';

const instance: UserBaseModel = {
    id,
    phoneNumber,
    email,
    firstName,
    lastName,
    accessToken,
    refreshToken,
    userStep,
    role,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
