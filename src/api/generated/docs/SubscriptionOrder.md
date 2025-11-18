# SubscriptionOrder


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**referenceCode** | **string** |  | [optional] [default to undefined]
**price** | **string** |  | [optional] [default to undefined]
**currencyCode** | **string** |  | [optional] [default to undefined]
**startPeriod** | **string** |  | [optional] [default to undefined]
**endPeriod** | **string** |  | [optional] [default to undefined]
**orderStatus** | **string** |  | [optional] [default to undefined]
**orderPaymentAttempts** | [**Array&lt;PaymentAttemptDto&gt;**](PaymentAttemptDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { SubscriptionOrder } from './api';

const instance: SubscriptionOrder = {
    referenceCode,
    price,
    currencyCode,
    startPeriod,
    endPeriod,
    orderStatus,
    orderPaymentAttempts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
