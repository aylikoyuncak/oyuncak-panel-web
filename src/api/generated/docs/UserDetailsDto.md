# UserDetailsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**userName** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**childInfos** | [**Array&lt;ChildInfoUserDto&gt;**](ChildInfoUserDto.md) |  | [optional] [default to undefined]
**addresses** | [**Array&lt;AddressUserDto&gt;**](AddressUserDto.md) |  | [optional] [default to undefined]
**subscriptions** | [**Array&lt;SubscriptionUserDto&gt;**](SubscriptionUserDto.md) |  | [optional] [default to undefined]
**orders** | [**Array&lt;OrderUserDto&gt;**](OrderUserDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { UserDetailsDto } from './api';

const instance: UserDetailsDto = {
    userId,
    userName,
    email,
    firstName,
    lastName,
    childInfos,
    addresses,
    subscriptions,
    orders,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
