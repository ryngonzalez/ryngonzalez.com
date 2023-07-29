"use client"

import * as React from "react"

import { Loading } from "../notion/Loading"
import { LoadingIcon } from "../notion/LoadingIcon"

export const useSubscribe = () => {
  const [state, dispatch] = React.useReducer(transition, FormState.Start)

  const handleSubmit = async (email?: string) => {
    dispatch(FormEvent.Submit)
    try {
      await subscribe(email)
      dispatch(FormEvent.Saved)
    } catch (error) {
      dispatch(FormEvent.Errored)
    }
  }

  return [handleSubmit, { state, dispatch }] as const
}

export function subscribe(email?: string) {
  if (!email) {
    return
  }
  const params = new URLSearchParams({ email } as Record<string, string>)
  return new Promise((resolve, reject) => {
    window
      .fetch(`/api/subscribe`, {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      .then((response) => {
        if (response.ok) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}

export enum FormEvent {
  Change,
  Submit,
  Saved,
  Errored,
}

export enum FormState {
  Start,
  Loading,
  Done,
  Error,
}

const machine = {
  [FormState.Start]: {
    [FormEvent.Submit]: FormState.Loading,
  },
  [FormState.Loading]: {
    [FormEvent.Saved]: FormState.Done,
    [FormEvent.Errored]: FormState.Error,
  },
  [FormState.Done]: {
    [FormEvent.Change]: FormState.Start,
  },
  [FormState.Error]: {
    [FormEvent.Change]: FormState.Start,
    [FormEvent.Submit]: FormState.Loading,
  },
}

export const transition = (state: FormState, event: FormEvent): FormState => {
  return machine[state][event] ?? state
}

export function NewsletterForm() {
  const [subscribe, { state, dispatch }] = useSubscribe()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const email = evt.target.email.value
    return subscribe(email)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center">
        <input
          className="py-2 px-3 bg-input border-input focus:border-black mr-4 rounded-lg flex-grow-[0.5]"
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          required
        />
        <button
          type="submit"
          className="bg-black rounded-lg text-white py-2 px-3"
        >
          {(state === FormState.Start || state === FormState.Error) && (
            <div>Subscribe</div>
          )}
          {state === FormState.Loading && (
            <div>
              <LoadingIcon />
            </div>
          )}
          {state === FormState.Done && "Subscribed!"}
        </button>
      </div>
      {state === FormState.Done && (
        <p className="text-sm block">
          Thanks! Check your inbox — we sent you a confirmation email.
        </p>
      )}
      {state === FormState.Error && (
        <p className="text-sm text-red-800 block">
          There was an issue creating your newsletter subscription, please try
          again.
        </p>
      )}
    </form>
  )
}
