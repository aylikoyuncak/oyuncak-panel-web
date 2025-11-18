# SubscriptionResource


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**referenceCode** | **string** |  | [optional] [default to undefined]
**parentReferenceCode** | **string** |  | [optional] [default to undefined]
**pricingPlanReferenceCode** | **string** |  | [optional] [default to undefined]
**customerReferenceCode** | **string** |  | [optional] [default to undefined]
**subscriptionStatus** | **string** |  | [optional] [default to undefined]
**trialDays** | **number** |  | [optional] [default to undefined]
**trialStartDate** | **number** |  | [optional] [default to undefined]
**trialEndDate** | **number** |  | [optional] [default to undefined]
**createdDate** | **number** |  | [optional] [default to undefined]
**startDate** | **number** |  | [optional] [default to undefined]
**customerEmail** | **string** |  | [optional] [default to undefined]
**subscriptionOrders** | [**Array&lt;SubscriptionOrder&gt;**](SubscriptionOrder.md) |  | [optional] [default to undefined]

## Example

```typescript
import { SubscriptionResource } from './api';

const instance: SubscriptionResource = {
    referenceCode,
    parentReferenceCode,
    pricingPlanReferenceCode,
    customerReferenceCode,
    subscriptionStatus,
    trialDays,
    trialStartDate,
    trialEndDate,
    createdDate,
    startDate,
    customerEmail,
    subscriptionOrders,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
