# use-cep-hook :earth_americas: ![npm](https://img.shields.io/npm/v/use-cep-hook)

This is a simple React Hooks that let you search for a brazillian postal-code.  

# Installation

Just run a ```yarn add use-cep-hook``` or ```npm i --save use-cep-hook```

# How to use

Simply import `use-cep-hook` on your component, then call this on that way:

```jsx
import useCep from "use-cep-hook";

const Foo = () => {
  const [postalCode, setPostalCode] = useState("");

  const [loading, cep, error] = useCep(postalCode);

  return (
    <div className="field">
      <label>CEP:</label>
      <input onChange={e => setPostalCode(e.target.value)} value={postalCode} />
    </div>
  );
};
```

Every time that a valid CEP is passed to this hooks, this will cause a side effect that will search for the updated value.

You can check the full implementation [here](https://github.com/MateusAndrade/use-cep-hook/blob/master/src/hooks/index.tsx)!

## TODO:

- [x] Port to TS
- [ ] Apply some cool CSS to `example`
- [ ] Write TESTS!
- [ ] Deploy example to `surge.sh`!
- [ ] Configure Github Actions
