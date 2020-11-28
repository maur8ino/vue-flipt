import { shallowMount } from "@vue/test-utils";
import Flipt from "@/components/Flipt";

describe("Flipt", () => {
  const mountWrapper = $flipt =>
    shallowMount(Flipt, {
      mocks: { $flipt },
      propsData: {
        entityId: "entity-1",
        flagKey: "test-key",
        context: { value1: "red", value2: "green" },
      },
      scopedSlots: {
        default(props) {
          if (props.loading) {
            return this.$createElement("div", "loading");
          }
          if (props.error) {
            return this.$createElement("div", "error");
          }
          return this.$createElement("ul", {}, [
            this.$createElement("li", `match: ${props.match}`),
            this.$createElement("li", `value: ${props.value}`),
          ]);
        },
      },
    });

  it("should render the default scoped slot passing values when the promise is resolved", async () => {
    const evaluate = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ match: true, value: "enabled" })
      );
    const $flipt = { evaluate };
    const wrapper = mountWrapper($flipt);
    expect(evaluate).toHaveBeenCalledWith(
      "entity-1",
      "test-key",
      { value1: "red", value2: "green" },
      undefined
    );
    expect(wrapper.text()).toBe("loading");

    // .then().catch().finally()
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("match: true");
    expect(wrapper.text()).toContain("value: enabled");
    expect(wrapper.emitted("loaded")[0]).toEqual([
      {
        match: true,
        value: "enabled",
      },
    ]);
  });

  it("should render the default scoped slot passing values when the promise is rejected", async () => {
    const evaluate = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("network error")));
    const $flipt = { evaluate };
    const wrapper = mountWrapper($flipt);
    expect(evaluate).toHaveBeenCalledWith(
      "entity-1",
      "test-key",
      { value1: "red", value2: "green" },
      undefined
    );
    expect(wrapper.text()).toBe("loading");

    // .then().catch().finally()
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("error");
    expect(wrapper.emitted("error")[0]).toEqual([new Error("network error")]);
  });
});
