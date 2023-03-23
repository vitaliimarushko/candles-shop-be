interface GeneratePolicyParamsInterface {
  principalId: string;
  resource: string | string[];
  effect: string;
}

interface GeneratePolicyPReturnInterface {
  principalId: string;
  policyDocument: {
    Version: "2012-10-17";
    Statement: {
      Action: "execute-api:Invoke";
      Effect: string;
      Resource: string | string[];
    }[];
  };
}

export const generatePolicy = (
  params: GeneratePolicyParamsInterface,
): GeneratePolicyPReturnInterface => {
  const { principalId, resource, effect = "Deny" } = params;

  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
