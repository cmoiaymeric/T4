import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Deadlock Detection System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Deadlock Types Detection', () => {
    it('devrait détecter un deadlock par limite de cartes atteinte', () => {
      const checkDeadlock = (
        cardsPlayedThisTurn: number,
        requirementMet: boolean,
        currentRequirement: { requiredType: string } | null
      ) => {
        if (cardsPlayedThisTurn >= 3 && !requirementMet && currentRequirement?.requiredType) {
          return 'limit-reached'
        }
        return null
      }

      const result = checkDeadlock(3, false, { requiredType: 'study' })
      expect(result).toBe('limit-reached')

      const noDeadlock = checkDeadlock(2, false, { requiredType: 'study' })
      expect(noDeadlock).toBe(null)
    })

    it('devrait détecter un deadlock par absence de cartes valides', () => {
      const checkDeadlock = (
        workStudyInventory: Array<{ actionType: string }>,
        currentRequirement: { requiredType: string } | null
      ) => {
        if (currentRequirement?.requiredType && workStudyInventory.length > 0) {
          const hasValidCard = workStudyInventory.some(card => card.actionType === currentRequirement.requiredType)
          if (!hasValidCard) {
            return 'no-valid-cards'
          }
        }
        return null
      }

      const inventory = [{ actionType: 'work' }, { actionType: 'mental' }]
      const result = checkDeadlock(inventory, { requiredType: 'study' })
      expect(result).toBe('no-valid-cards')

      const validInventory = [{ actionType: 'study' }, { actionType: 'work' }]
      const noDeadlock = checkDeadlock(validInventory, { requiredType: 'study' })
      expect(noDeadlock).toBe(null)
    })

    it('devrait détecter un deadlock par absence totale de cartes', () => {
      const checkDeadlock = (
        workStudyInventory: Array<{ actionType: string }>,
        remainingWorkStudyCards: number,
        currentRequirement: { requiredType: string } | null
      ) => {
        if (workStudyInventory.length === 0 && remainingWorkStudyCards === 0 && currentRequirement?.requiredType) {
          return 'no-cards-left'
        }
        return null
      }

      const result = checkDeadlock([], 0, { requiredType: 'study' })
      expect(result).toBe('no-cards-left')

      const noDeadlock = checkDeadlock([{ actionType: 'study' }], 0, { requiredType: 'study' })
      expect(noDeadlock).toBe(null)

      const stillHasCards = checkDeadlock([], 5, { requiredType: 'study' })
      expect(stillHasCards).toBe(null)
    })
  })

  describe('Deadlock Resolution', () => {
    it('devrait créer une carte de secours appropriée', () => {
      const createRescueCard = (requiredType: 'study' | 'work') => {
        return {
          id: `rescue-${Date.now()}`,
          name: `Carte de secours (${requiredType === 'study' ? 'Étudier' : 'Travailler'})`,
          description: 'Carte générée automatiquement pour résoudre le deadlock',
          actionType: requiredType,
          mentalBoost: 0,
          image: '',
        }
      }

      const studyCard = createRescueCard('study')
      expect(studyCard.actionType).toBe('study')
      expect(studyCard.name).toContain('Étudier')

      const workCard = createRescueCard('work')
      expect(workCard.actionType).toBe('work')
      expect(workCard.name).toContain('Travailler')
    })

    it('devrait vérifier si une carte de secours peut être ajoutée', () => {
      const canAddRescueCard = (inventoryLength: number, inventoryLimit: number) => {
        return inventoryLength < inventoryLimit
      }

      expect(canAddRescueCard(3, 6)).toBe(true)
      expect(canAddRescueCard(5, 6)).toBe(true)
      expect(canAddRescueCard(6, 6)).toBe(false)
      expect(canAddRescueCard(7, 6)).toBe(false)
    })
  })

  describe('Deadlock Message Generation', () => {
    it('devrait générer les messages appropriés pour chaque type de deadlock', () => {
      const getDeadlockMessage = (deadlockType: string) => {
        switch (deadlockType) {
          case 'limit-reached':
            return 'Limite de cartes atteinte. Passez le tour pour continuer.'
          case 'no-valid-cards':
            return 'Aucune carte valide disponible. Piochez ou passez le tour.'
          case 'no-cards-left':
            return 'Plus de cartes disponibles. Passez le tour.'
          default:
            return ''
        }
      }

      expect(getDeadlockMessage('limit-reached')).toBe('Limite de cartes atteinte. Passez le tour pour continuer.')
      expect(getDeadlockMessage('no-valid-cards')).toBe('Aucune carte valide disponible. Piochez ou passez le tour.')
      expect(getDeadlockMessage('no-cards-left')).toBe('Plus de cartes disponibles. Passez le tour.')
      expect(getDeadlockMessage('unknown')).toBe('')
    })
  })

  describe('Deadlock Resolution Actions', () => {
    it('devrait déterminer si un bouton de pioche doit être affiché', () => {
      const shouldShowDrawButton = (
        deadlockType: string,
        remainingWorkStudyCards: number,
        inventoryLength: number,
        inventoryLimit: number
      ) => {
        return deadlockType === 'no-valid-cards' && 
               remainingWorkStudyCards > 0 && 
               inventoryLength < inventoryLimit
      }

      expect(shouldShowDrawButton('no-valid-cards', 5, 3, 6)).toBe(true)
      expect(shouldShowDrawButton('no-valid-cards', 0, 3, 6)).toBe(false)
      expect(shouldShowDrawButton('no-valid-cards', 5, 6, 6)).toBe(false)
      expect(shouldShowDrawButton('limit-reached', 5, 3, 6)).toBe(false)
    })

    it('devrait déterminer si un bouton de secours doit être affiché', () => {
      const shouldShowRescueButton = (deadlockType: string) => {
        return deadlockType === 'no-valid-cards' || deadlockType === 'no-cards-left'
      }

      expect(shouldShowRescueButton('no-valid-cards')).toBe(true)
      expect(shouldShowRescueButton('no-cards-left')).toBe(true)
      expect(shouldShowRescueButton('limit-reached')).toBe(false)
      expect(shouldShowRescueButton('none')).toBe(false)
    })
  })

  describe('Complex Deadlock Scenarios', () => {
    it('devrait gérer les scénarios de deadlock complexes', () => {
      const analyzeComplexDeadlock = (
        cardsPlayedThisTurn: number,
        workStudyInventory: Array<{ actionType: string }>,
        remainingWorkStudyCards: number,
        currentRequirement: { requiredType: string; requiredCount: number } | null,
        playedValidCount: number
      ) => {
        const requirementMet = currentRequirement ? 
          playedValidCount >= currentRequirement.requiredCount : true

        // Priorité: limit-reached > no-valid-cards > no-cards-left
        if (cardsPlayedThisTurn >= 3 && !requirementMet && currentRequirement?.requiredType) {
          return 'limit-reached'
        }
        
        if (currentRequirement?.requiredType && workStudyInventory.length > 0) {
          const hasValidCard = workStudyInventory.some(card => card.actionType === currentRequirement.requiredType)
          if (!hasValidCard) {
            return 'no-valid-cards'
          }
        }
        
        if (workStudyInventory.length === 0 && remainingWorkStudyCards === 0 && currentRequirement?.requiredType) {
          return 'no-cards-left'
        }
        
        return null
      }

      // Scénario 1: Limite atteinte
      const scenario1 = analyzeComplexDeadlock(
        3, 
        [{ actionType: 'work' }], 
        5, 
        { requiredType: 'study', requiredCount: 2 }, 
        0
      )
      expect(scenario1).toBe('limit-reached')

      // Scénario 2: Pas de cartes valides
      const scenario2 = analyzeComplexDeadlock(
        1, 
        [{ actionType: 'work' }, { actionType: 'mental' }], 
        5, 
        { requiredType: 'study', requiredCount: 2 }, 
        0
      )
      expect(scenario2).toBe('no-valid-cards')

      // Scénario 3: Plus de cartes
      const scenario3 = analyzeComplexDeadlock(
        1, 
        [], 
        0, 
        { requiredType: 'study', requiredCount: 2 }, 
        0
      )
      expect(scenario3).toBe('no-cards-left')

      // Scénario 4: Pas de deadlock
      const scenario4 = analyzeComplexDeadlock(
        1, 
        [{ actionType: 'study' }], 
        5, 
        { requiredType: 'study', requiredCount: 2 }, 
        0
      )
      expect(scenario4).toBe(null)
    })
  })
})
