(function (React) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    var ImageView$1 = function ImageView(props) {
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("img", {
        src: props.record.params.imageUrl,
        alt: "profile-photo",
        width: "100",
        height: "100"
      }));
    };

    var ImageView = function ImageView(props) {
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("img", {
        src: props.record.params.imageUrl,
        alt: "profile-photo",
        width: "300",
        height: "300"
      }));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.Component1 = ImageView$1;
    AdminJS.UserComponents.Component2 = ImageView;
    AdminJS.UserComponents.Component3 = ImageView$1;
    AdminJS.UserComponents.Component4 = ImageView;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9yZWFjdF9jb21wb25lbnRzL2ltYWdlX3ZpZXcuanN4IiwiLi4vcmVhY3RfY29tcG9uZW50cy9wcm9maWxlX2ltYWdlLmpzeCIsIi5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEltYWdlVmlldyA9IHByb3BzPT57XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb3BzLnJlY29yZC5wYXJhbXMuaW1hZ2VVcmx9IFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJwcm9maWxlLXBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICApO1xuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VWaWV3OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgSW1hZ2VWaWV3ID0gcHJvcHM9PntcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cHJvcHMucmVjb3JkLnBhcmFtcy5pbWFnZVVybH0gXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInByb2ZpbGUtcGhvdG9cIlxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjMwMFwiIFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVZpZXc7IiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQ29tcG9uZW50MSBmcm9tICcuLi9yZWFjdF9jb21wb25lbnRzL2ltYWdlX3ZpZXcnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDEgPSBDb21wb25lbnQxXG5pbXBvcnQgQ29tcG9uZW50MiBmcm9tICcuLi9yZWFjdF9jb21wb25lbnRzL3Byb2ZpbGVfaW1hZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDIgPSBDb21wb25lbnQyXG5pbXBvcnQgQ29tcG9uZW50MyBmcm9tICcuLi9yZWFjdF9jb21wb25lbnRzL2ltYWdlX3ZpZXcnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDMgPSBDb21wb25lbnQzXG5pbXBvcnQgQ29tcG9uZW50NCBmcm9tICcuLi9yZWFjdF9jb21wb25lbnRzL3Byb2ZpbGVfaW1hZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDQgPSBDb21wb25lbnQ0Il0sIm5hbWVzIjpbIkltYWdlVmlldyIsInByb3BzIiwiUmVhY3QiLCJyZWNvcmQiLCJwYXJhbXMiLCJpbWFnZVVybCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbXBvbmVudDEiLCJDb21wb25lbnQyIiwiQ29tcG9uZW50MyIsIkNvbXBvbmVudDQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQSxJQUFNQSxXQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBQyxLQUFLLEVBQUU7SUFDakIsRUFBQSxvQkFDUUMseUJBQ0ksQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsZUFBQUEseUJBQUEsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBO0lBQUssSUFBQSxHQUFHLEVBQUVELEtBQUssQ0FBQ0UsTUFBTixDQUFhQyxNQUFiLENBQW9CQyxRQUE5QjtJQUNBLElBQUEsR0FBRyxFQUFDLGVBREo7SUFFQSxJQUFBLEtBQUssRUFBQyxLQUZOO0lBRVksSUFBQSxNQUFNLEVBQUMsS0FBQTtJQUZuQixHQUFBLENBREosQ0FEUixDQUFBO0lBUUgsQ0FUTDs7SUNBQSxJQUFNTCxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBQyxLQUFLLEVBQUU7SUFDakIsRUFBQSxvQkFDUUMseUJBQ0ksQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsZUFBQUEseUJBQUEsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBO0lBQUssSUFBQSxHQUFHLEVBQUVELEtBQUssQ0FBQ0UsTUFBTixDQUFhQyxNQUFiLENBQW9CQyxRQUE5QjtJQUNBLElBQUEsR0FBRyxFQUFDLGVBREo7SUFFQSxJQUFBLEtBQUssRUFBQyxLQUZOO0lBRVksSUFBQSxNQUFNLEVBQUMsS0FBQTtJQUZuQixHQUFBLENBREosQ0FEUixDQUFBO0lBUUgsQ0FUTDs7SUNGQUMsT0FBTyxDQUFDQyxjQUFSLEdBQXlCLEVBQXpCLENBQUE7SUFFQUQsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxVQUF2QixHQUFvQ0EsV0FBcEMsQ0FBQTtJQUVBRixPQUFPLENBQUNDLGNBQVIsQ0FBdUJFLFVBQXZCLEdBQW9DQSxTQUFwQyxDQUFBO0lBRUFILE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkcsVUFBdkIsR0FBb0NBLFdBQXBDLENBQUE7SUFFQUosT0FBTyxDQUFDQyxjQUFSLENBQXVCSSxVQUF2QixHQUFvQ0EsU0FBcEM7Ozs7OzsifQ==
