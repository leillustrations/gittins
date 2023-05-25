import numpy as np

def gittins_index(successes, failures, discount_factor):
    """
    Calculates the Gittins index for a given number of successes and failures, 
    along with a discount factor.
    
    Arguments:
    successes -- number of observed successes
    failures -- number of observed failures
    discount_factor -- discount factor or exploration parameter
    
    Returns:
    gittins -- calculated Gittins index
    """
    n = successes + failures + 1  # Total number of trials
    p = (successes + 1) / n  # Estimated success probability

    # Calculate Gittins index using the formula
    gittins = (p * (1 - discount_factor)) / (1 - discount_factor * (1 - p))
    
    return gittins


# Example usage
successes = 10
failures = 5
discount_factor = 0.9

gittins = gittins_index(successes, failures, discount_factor)
print("Gittins index:", gittins)
